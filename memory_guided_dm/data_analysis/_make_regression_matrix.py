import numpy as np
import pandas as pd
import scipy.stats as stats
from datetime import date, datetime,timedelta

def get_age(participant_id):
    demo_df = pd.read_csv("demographics.csv")
    return demo_df.query("participant_id == @participant_id").Age.values[0]

def get_identity(dataframe, row, choice_focus):
    trial_n = row.trial_n
    last_trial = dataframe.query("trial_n==@trial_n-1")
    last_choice = last_trial.choice.values[0]

    if (last_trial.trial_type.values[0] == 'do_trial') & (last_choice>0): 
        curr_choice = row.choice
        if last_choice == choice_focus:
            return 1
        else:
            return -1
    else:
        return 0 
    
def get_reward(dataframe, row, kernel, choice_focus):
    trial_n = row.trial_n
    prev_trial = dataframe.query("trial_n==@trial_n-@kernel")
    prev_choice = prev_trial.choice.values[0]

    if (prev_trial.trial_type.values[0] == 'do_trial') & (prev_choice>0): 
        curr_choice = row.choice
        prev_choice = prev_trial.choice.values[0]
        prev_reward = prev_trial.outcome.values[0]
        if (prev_choice == choice_focus):
            if prev_reward:
                return 1
            else:
                return -1
        else:            
            if prev_reward:
                return -1
            else:
                return 1
    else:
        return 0  
    
def get_probed_identity(dataframe, row, choice_focus):
    trial_n = row.trial_n
    last_trial = dataframe.query("trial_n==@trial_n-1")
    last_response = last_trial.response.values[0]
    if ((last_trial.trial_type.values[0] == 'do_recog') & (last_response>0)& (last_trial.is_valid.values[0]==1)): # check if follows recognition trial
        probed_trial_n = last_trial.probed_trial.values[0]
        probed_trial = dataframe.query("trial_n==@probed_trial_n")
        probed_choice = probed_trial.choice.values[0]
        probed_reward = probed_trial.outcome.values[0]
        if ((int(last_trial.correct.values[0]) == 1) & (probed_choice>0)): # valid probe and correctly remembered
            if (probed_choice==choice_focus):
                return 1
            else:
                return -1
        else:
            return 0 
    else:
        return 0 
    
def get_probed_reward(dataframe, row, choice_focus):
    trial_n = row.trial_n
    last_trial = dataframe.query("trial_n==@trial_n-1")
    last_response = last_trial.response.values[0]
    if ((last_trial.trial_type.values[0] == 'do_recog') & (last_response>0)& (last_trial.is_valid.values[0]==1)): # check if follows recognition trial
        probed_trial_n = last_trial.probed_trial.values[0]
        probed_trial = dataframe.query("trial_n==@probed_trial_n")
        probed_choice = probed_trial.choice.values[0]
        probed_reward = probed_trial.outcome.values[0]
        if ((int(last_trial.correct.values[0]) == 1) & (probed_choice>0)): # valid probe and correctly remembered
            if (probed_choice==choice_focus):
                if probed_reward:
                    return 1
                else:
                    return -1
            else:
                if probed_reward:
                    return -1
                else:
                    return 1
        else:
            return 0 
    else:
        return 0 
    
    
def get_probed_reward_valence(dataframe, row, choice_focus): # CHECK THIS IS THE RIGHT WAY TO DO IT 
    trial_n = row.trial_n
    last_trial = dataframe.query("trial_n==@trial_n-1")
    last_response = last_trial.response.values[0]
    if ((last_trial.trial_type.values[0] == 'do_recog') & (last_response>0)& (last_trial.is_valid.values[0]==1)): # check if follows recognition trial
        probed_trial_n = last_trial.probed_trial.values[0]
        probed_trial = dataframe.query("trial_n==@probed_trial_n")
        probed_choice = probed_trial.choice.values[0]
        probed_reward = probed_trial.outcome.values[0]
        if ((int(last_trial.correct.values[0]) == 1) & (probed_choice>0)): # valid probe and correctly remembered
            if (probed_choice==choice_focus):
                if probed_reward:
                    return 1
                else:
                    return 0
            else:
                if probed_reward:
                    return -1
                else:
                    return 0
        else:
            return 0 
    else:
        return 0 
    
def get_probed_pe(dataframe, pe_timeseries, row, choice_focus):
    trial_n = row.trial_n
    last_trial = dataframe.query("trial_n==@trial_n-1")
    last_response = last_trial.response.values[0]
    if ((last_trial.trial_type.values[0] == 'do_recog') & (last_response>0)& (last_trial.is_valid.values[0]==1)): # check if follows recognition trial
        probed_trial_n = last_trial.probed_trial.values[0]
        probed_trial = dataframe.query("trial_n==@probed_trial_n")
        probed_choice = probed_trial.choice.values[0]
        if ((int(last_trial.correct.values[0]) == 1) & (probed_choice>0)): # valid probe and correctly remembered
            probed_trial_pe = pe_timeseries.query("trial_n==@probed_trial_n").pe.values[0]
            if (probed_choice==choice_focus):
                return probed_trial_pe
            else:
                return probed_trial_pe*-1
        else:
            return 0
    else:
        return 0 
    
def make_ctx_r_arr(data):
    arr = np.zeros((6,3))
    for context in range(0,6):
        for choice in [1,2,3]:
            times_chosen = len(data.query("trial_type=='do_trial' & choice==@choice & context_n==@context"))
            if times_chosen == 0:
                arr[context,choice-1] = 0
            else:
                times_rewarded = len(data.query("trial_type=='do_trial' & choice==@choice & outcome==1 & context_n==@context"))
                times_notrewarded = len(data.query("trial_type=='do_trial' & choice==@choice & outcome==0 & context_n==@context"))
                arr[context,choice-1] = (times_rewarded-times_notrewarded)/times_chosen
    return arr


def get_context_reward(dataframe, row, ctx_r_arr, lag, choice_focus):
    trial_n = row.trial_n
    last_trial = dataframe.query("trial_n==@trial_n-@lag")
    probed_trial_n = last_trial.probed_trial.values[0]
    probed_trial = dataframe.query("trial_n==@probed_trial_n")
    last_response = last_trial.response.values[0]
    if (last_trial.trial_type.values[0] == 'do_recog') & (last_response>0) & (last_trial.is_valid.values[0]==1): # check if follows recognition trial
        probed_trial_n = last_trial.probed_trial.values[0]
        probed_trial = dataframe.query("trial_n==@probed_trial_n")
        probed_choice = probed_trial.choice.values[0]
        probed_reward = probed_trial.outcome.values[0]
        if ((int(last_trial.correct.values[0]) == 1) & (probed_choice>0)): # valid probe and correctly remembered
            curr_choice = int(row.choice)
            probed_ctx = int(probed_trial.context_n.values[0])
            return ctx_r_arr[probed_ctx,choice_focus-1]
        else:
            return 0 
    else:
        return 0 

    
def get_total_reward(dataframe, row, lag, choice_focus):
    trial_n = row.trial_n
    last_trial = dataframe.query("trial_n==@trial_n-@lag")
    probed_trial_n = last_trial.probed_trial.values[0]
    probed_trial = dataframe.query("trial_n==@probed_trial_n")
    last_response = last_trial.response.values[0]
    if (last_trial.trial_type.values[0] == 'do_recog') & (last_response>0): # check if follows recognition trial
        if (int(last_trial.is_valid.values[0]) == 1) & (int(last_trial.correct.values[0]) == 1) & (probed_trial.choice.values[0]>0):  # valid probe and correctly remembered
            times_chosen = len(dataframe.query("trial_type=='do_trial'&context_n<6&choice==@choice_focus"))
            if times_chosen == 0:
                return 0
            else:
                times_rewarded = len(dataframe.query("trial_type=='do_trial' & context_n<6 & choice==@choice_focus & outcome==1"))
                times_notrewarded = len(dataframe.query("trial_type=='do_trial'& context_n<6&choice==@choice_focus & outcome==0"))
            
                return(times_rewarded-times_notrewarded)/times_chosen
        else:
            return 0 
    else:
        return 0 


def sub_design_mat_long(dataframe, participant_id):
    sub_data=dataframe.query("participant_id == @participant_id")
    age = get_age(participant_id)
    context_r = make_ctx_r_arr(sub_data)
    reg_trials = sub_data.query("trial_n>239&trial_type=='do_trial' & response>0")
    design_mat = np.zeros((len(reg_trials)*3,12))
    count = 0
    for index, row in reg_trials.iterrows():
        trial_n = row.trial_n
        choice = row.choice
        for option in [1,2,3]: 
            
            design_mat[count,0] = participant_id

            design_mat[count,1] = age

            design_mat[count,2] = option

            design_mat[count,3] = int(choice==option)
                
            design_mat[count,4] = get_identity(sub_data,row,option)
            
            design_mat[count,5] = get_reward(sub_data,row,1,option)
            
            design_mat[count,6] = get_reward(sub_data,row,2,option)
            
            design_mat[count,7] = get_reward(sub_data,row,3,option)
                
            design_mat[count,8] = get_probed_identity(sub_data,row,option)
                
            design_mat[count,9] = get_probed_reward(sub_data,row,option)

            design_mat[count,10] = get_context_reward(sub_data,row,context_r,1,option)
                                                                
            design_mat[count,11] = str(participant_id)+ "_" + str(trial_n)
                    
            count += 1
        
    return design_mat


def all_design_mat_long(data,subs):
    arr = sub_design_mat_long(data, subs[0])
    for sub in subs[1:]:
        print(sub)
        try:
            sub_mat = sub_design_mat_long(data,sub)
            arr = np.concatenate((arr,sub_mat))
        except:
            print(f"Error for subject {sub}")
            continue
    df = pd.DataFrame(arr,columns=['participant_id','age','option','choice','identity','reward_1','reward_2','reward_3','probed_identity','probed_reward','context_rwd','trial_n'])
    return df

def sub_design_mat_wide(dataframe, participant_id):
    sub_data=dataframe.query("participant_id == @participant_id")
    age = get_age(participant_id)
    context_r = make_ctx_r_arr(sub_data)
    reg_trials = sub_data.query("trial_n>239&trial_type=='do_trial' & response>0")
    choices = []
    design_mat = np.zeros((len(reg_trials),24))
    count = 0
    for index, row in reg_trials.iterrows():
        trial_n = row.trial_n
        choice = row.choice
            
        design_mat[count,0] = participant_id

        design_mat[count,1] = age

        design_mat[count,2] = choice
            
        design_mat[count,3] = get_identity(sub_data,row,1)
        
        design_mat[count,4] = get_reward(sub_data,row,1,1)
        
        design_mat[count,5] = get_reward(sub_data,row,2,1)
        
        design_mat[count,6] = get_reward(sub_data,row,3,1)
            
        design_mat[count,7] = get_probed_identity(sub_data,row,1)
            
        design_mat[count,8] = get_probed_reward(sub_data,row,1)

        design_mat[count,9] = get_context_reward(sub_data,row,context_r,1,1)

        design_mat[count,10] = get_identity(sub_data,row,2)
        
        design_mat[count,11] = get_reward(sub_data,row,1,2)
        
        design_mat[count,12] = get_reward(sub_data,row,2,2)
        
        design_mat[count,13] = get_reward(sub_data,row,3,2)
            
        design_mat[count,14] = get_probed_identity(sub_data,row,2)
            
        design_mat[count,15] = get_probed_reward(sub_data,row,2)

        design_mat[count,16] = get_context_reward(sub_data,row,context_r,1,2)
                                                
        design_mat[count,17] = get_identity(sub_data,row,3)
        
        design_mat[count,18] = get_reward(sub_data,row,1,3)
        
        design_mat[count,19] = get_reward(sub_data,row,2,3)
        
        design_mat[count,20] = get_reward(sub_data,row,3,3)
            
        design_mat[count,21] = get_probed_identity(sub_data,row,3)
            
        design_mat[count,22] = get_probed_reward(sub_data,row,3)

        design_mat[count,23] = get_context_reward(sub_data,row,context_r,1,3)    
                
        count += 1
        
    return design_mat

def all_design_mat_wide(data,subs):
    arr = sub_design_mat_wide(data, subs[0])
    for sub in subs[1:]:
        print(sub)
        try:
            sub_mat = sub_design_mat_wide(data,sub)
            arr = np.concatenate((arr,sub_mat))
        except:
            print(f"Error for subject {sub}")
            continue
    df = pd.DataFrame(arr,columns=['participant_id','age','choice','identity_1','reward1_1','reward2_1','reward3_1','probedIdentity_1','probedReward_1','contextRwd_1','identity_2','reward1_2','reward2_2','reward3_2','probedIdentity_2','probedReward_2','contextRwd_2','identity_3','reward1_3','reward2_3','reward3_3','probedIdentity_3','probedReward_3','contextRwd_3'])
    return df

