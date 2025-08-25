import numpy as np
import pandas as pd
import scipy.stats as stats
from datetime import date, datetime,timedelta
from glob import glob


##### CLEAN DATA ################################################################
def convert_response(row):
    # takes jspsych key press numbers and converts to more interpretable numbers 
    if row['response'] == 49: # red beard 
        return 1
    elif row['response'] == 50: # white beard 
        return 2
    elif row['response'] == 51: # black beard 
        return 3
    else:
        return np.nan

def get_key_columns(df):
    # retrieve only the necessary columns from the data file 
    clean_df = df.loc[:,['participant_id','trial_type','response','rt','trial_n',
                         'context_n','outcome','is_valid','probe','probe_img_id','probed_trial', 'probed_context','context_img_id', 'correct',
                         'pR_red','pR_white','pR_black']]
    clean_df['choice'] = clean_df.apply (lambda row: convert_response(row), axis=1)
    
    return clean_df 

def get_raw_data_filepaths(day):
    file_prefix = "../data/day_"+str(day)+"/*"
    file_suffix = "*csv"
    files = []
    
    start_date = date(2022, 1, 18) # first subject run 
    now = datetime.now() # today's date 
    end_date = date(now.year,now.month,now.day)   # perhaps date.now()
    delta = end_date - start_date   # returns timedelta object which contains the days that falls between the start date and the current date 
    
    for i in range(delta.days + 1): # loop through days 
        day = start_date + timedelta(days=i)
        files_from_date = glob(file_prefix+str(day)+file_suffix) # get all the date collected on this day 
        for f in files_from_date:
            files.append(f) # add too files list 
    return files

def day_1_participant_id_dict(data):
    # create a dictiobary of day 1 data with subject ids as keys, how we will link together day 1 and day 2 data 
    day_1_dict = {}
    for f in data:
        df = pd.read_csv(f)
        participant_id = df.participant_id.dropna().reset_index().participant_id[0]
        day_1_dict[participant_id] = df
    return day_1_dict

def merge_day_1_and_2_data(day_1_data_dictionary, day_2_dataframe):
    participant_id = int(day_2_dataframe.participant_id.dropna().reset_index().participant_id[0])
    day_1_dataframe = day_1_data_dictionary[participant_id]
    combined_df = pd.concat([day_1_dataframe,day_2_dataframe])        
    combined_df = get_key_columns(combined_df)
        
    filename = "sub_" + str(int(participant_id)) + ".csv"
    combined_df['participant_id'] = participant_id

    # get the probabilities of reward for each bandit and save for parameter recovery - how robust is parameter recovery to different reward time series?s 
    probs = combined_df.query("trial_type =='do_trial' & trial_n<230").loc[:,['pR_red','pR_white','pR_black']]
   # probs.to_csv('modeling_context_bandits/param_recov/probs/sub_'+str(int(participant_id))+'.csv',index=False)
    return combined_df

##### EXCLUSIONS ################################################################
def get_proportion_sampled_options(dataframe):
    learn_phase = dataframe.query("trial_n > -1 &trial_n < 230 & trial_type=='do_trial'")
    learn_1 = len(learn_phase.query("choice==1"))/len(learn_phase)
    learn_2 = len(learn_phase.query("choice==2"))/len(learn_phase)
    learn_3 = len(learn_phase.query("choice==3"))/len(learn_phase)
    learn_NR = len(learn_phase.query("choice not in [1,2,3]"))/len(learn_phase)

    test_phase = dataframe.query("trial_n >= 230 & trial_type=='do_trial'")
    test_1 = len(test_phase.query("choice==1"))/len(test_phase)
    test_2 = len(test_phase.query("choice==2"))/len(test_phase)
    test_3 = len(test_phase.query("choice==3"))/len(test_phase)
    test_NR = len(test_phase.query("choice not in [1,2,3]"))/len(test_phase)
    
    df = pd.DataFrame({'phase':['learn']*4 + ['test']*4,'choice':['1','2','3','NR']*2,'proportion':[learn_1,learn_2,
                                                                                                    learn_3,learn_NR,
                                                                                                   test_1,test_2,
                                                                                                   test_3,test_NR]})
    return df

def get_average_rt(dataframe):
    trials=dataframe.query("(trial_type=='do_trial' | trial_type=='do_recog') & trial_n > -1")
    avg_rt = trials.rt.mean()
    return avg_rt


def get_web_interactions(day_1_data_dictionary, day_2_dataframe):
    participant_id = int(day_2_dataframe.participant_id.dropna().reset_index().participant_id[0])
    df_1_dataframe = day_1_data_dictionary[participant_id]
    combined_day_df = pd.concat([df_1_dataframe,day_2_dataframe]) 
    return len(combined_day_df.interactions.dropna().iloc[-1].split('\r\n'))-2 # remove 1 for the header and 1 for the last empty line 


def exclude_participant(day_1_data_dictionary, day_2_dataframe):
    sub_data = merge_day_1_and_2_data(day_1_data_dictionary,day_2_dataframe)# merge the data from the two days into one dataframe that is then exported to a csv which is fold in the csv folder 
    participant_id = int(day_2_dataframe.participant_id.dropna().reset_index().participant_id[0])

    options_sampled = get_proportion_sampled_options(sub_data)
    avg_rt = get_average_rt(sub_data)
    web_interactions = get_web_interactions(day_1_data_dictionary, sub_data)

    no_response_trials = options_sampled.query("choice == 'NR'")
    response_trials = options_sampled.query("choice != 'NR'")

    missing_response = (no_response_trials['proportion'] > 0.1).any()
    insufficient_exploration = (response_trials['proportion'] < 0.05).any()
    too_fast = avg_rt < 250
    distracted = web_interactions > 10
    late = participant_id == 859  # participant excluded for completing study late

    if any([missing_response, insufficient_exploration, too_fast, distracted, late]):
        return True, {
            'participant_id': participant_id,
            'missing_response': missing_response, 
            'insufficient_exploration': insufficient_exploration,
            'too_fast': too_fast,
            'distracted': distracted,
            'late': late
        }
    return False, None



