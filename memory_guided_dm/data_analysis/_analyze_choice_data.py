import numpy as np
import pandas as pd
import scipy.stats as stats
from _get_demographics import get_age
from _analyze_memory_data import corrected_dataframe

def get_probed_choice_relative_rt(day_1_dictionary, day_2_dataframe):
    day_2_corrected_df = corrected_dataframe(day_1_dictionary, day_2_dataframe)
    hit_trials = day_2_corrected_df.query("trial_type=='old' & correct==1").trial_n.values

    day_2_choice_trials = day_2_dataframe.query("trial_type=='do_trial' & response>0")
    day_2_choice_trials['zlog_rt'] = stats.zscore(np.log(day_2_choice_trials.rt + 1))
    choice_trials_of_interest = hit_trials + 1
    choice_trials_of_interest = day_2_choice_trials.query("trial_n in @choice_trials_of_interest")
    probed_choice_relative_rt = choice_trials_of_interest.loc[:,['trial_n','response','zlog_rt']]
    return probed_choice_relative_rt

def all_relative_choice_rt(day_1_dictionary, day_2_files, participants_to_include):
    rt_df = pd.DataFrame(columns=['participant_id','age','zlog_rt']) # object recognition memory 

    for f in day_2_files:
        try:
            day_2_df = pd.read_csv(f)
            participant_id = int(day_2_df.participant_id.dropna().reset_index().participant_id[0])
            age = get_age(participant_id)
            if participant_id in participants_to_include:
                sub_rts = get_probed_choice_relative_rt(day_1_dictionary, day_2_df)
                sub_rts['participant_id'] = participant_id
                sub_rts['age'] = age
                rt_df = pd.concat([rt_df,sub_rts])
        except:
            continue
    return rt_df
