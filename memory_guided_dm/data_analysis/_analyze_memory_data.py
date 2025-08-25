import numpy as np
import pandas as pd
import scipy.stats as stats
from _get_demographics import get_age
from _clean_data import merge_day_1_and_2_data

def corrected_dataframe(day_1_dictionary, day_2_dataframe):
    participant_id = int(day_2_dataframe.participant_id.dropna().reset_index().participant_id[0])
    day_1_dataframe = day_1_dictionary[participant_id]
    recog_trials = day_2_dataframe.query("trial_type=='do_recog' & response>0")
 # recognition memory trials in which a choice was made 
    old_trials = recog_trials.query("is_valid==1")
    new_trials = recog_trials.query("is_valid==0")
    output_df = []
    for _, t in old_trials.iterrows():
        probed_trial = int(t.probed_trial)
        probed_choice = day_1_dataframe.query("trial_n==@probed_trial").response.values[0]
        memory_response = int(t.response)
        if probed_choice > 0: 
            if (memory_response == 53) | (memory_response == 54):
                response_correct = 1
            else:
                response_correct = 0
            trial_type = 'old'
            output_df.append({'trial_type':trial_type, 'trial_n':t.trial_n, 'correct':response_correct})

        else:
            if (memory_response == 55) | (memory_response == 56):
                response_correct = 1
            else:
                response_correct = 0
            trial_type = 'new'
            output_df.append({'trial_type':trial_type, 'trial_n':t.trial_n, 'correct':response_correct})

    for _, t in new_trials.iterrows():
            memory_response = int(t.response)
            if (memory_response == 55) | (memory_response == 56):
                response_correct = 1
            else:
                response_correct = 0
            trial_type = 'new'
            output_df.append({'trial_type':trial_type, 'trial_n':t.trial_n,'correct':response_correct})
    return pd.DataFrame(output_df)


def calc_dprime(dataframe):
    # individual object recognition performance on probes 
    z_trans = stats.norm.ppf
    
    hits = len(dataframe.query("trial_type=='old' & correct==1"))
    misses =  len(dataframe.query("trial_type=='old' & correct==0"))
    hit_rate = hits/(hits+misses)
    
    crs = len(dataframe.query("trial_type=='new' & correct==1"))
    fas = len(dataframe.query("trial_type=='new' & correct==0"))
    fa_rate = fas/(fas+crs)
    
    half_hit = 0.5 / (hits + misses)
    half_fa = 0.5 / (fas + crs)
    
    if hit_rate == 1: 
        hit_rate = 1 - half_hit
    if hit_rate == 0: 
        hit_rate = half_hit
        
    if fa_rate == 1: 
        fa_rate = 1 - half_fa
    if fa_rate == 0: 
        fa_rate = half_fa
    
    return z_trans(hit_rate) - z_trans(fa_rate), misses/(hits+misses), fa_rate

def transform_data(key_response):
    if key_response == 49:
        return 'highway'
    elif key_response == 50:
        return 'coast' 
    elif key_response == 51:
        return 'mountain'
    elif key_response == 52:
        return 'forest'
    elif key_response == 53:
        return 'city'
    elif key_response == 54:
        return 'countryside' 

def calc_source_accuracy(dataframe):
    source_trials = dataframe.query("trial_type=='do_source'").reset_index(drop=True)
    all_acc=[]
    for row in source_trials.iterrows():
        try:
            row_info = row[1]
            probe = row_info.probe
            response = row_info.response
            chosen_context = transform_data(response)
            probe_context = dataframe.query("probe_img_id==@probe & trial_n<240").context_img_id.reset_index().context_img_id[0]
            all_acc.append(chosen_context==probe_context)
        except:
            continue
    return np.mean(all_acc)

def sub_memory(day_1_dictionary, day_2_dataframe):
    participant_id = int(day_2_dataframe.participant_id.dropna().reset_index().participant_id[0])

    corrected_recog = corrected_dataframe(day_1_dictionary, day_2_dataframe)
    d_prime, miss_rate, fa_rate = calc_dprime(corrected_recog)

    full_dataframe = merge_day_1_and_2_data(day_1_dictionary, day_2_dataframe)
    source_acc = calc_source_accuracy(full_dataframe)
    return d_prime, miss_rate, fa_rate, source_acc


def all_memory(day_1_dictionary, day_2_files, participants_to_include):
    memory_df = pd.DataFrame(columns=['participant_id','age','d_prime','source_acc']) # object recognition memory 

    for f in day_2_files:
        try:
            day_2_df = pd.read_csv(f)
            participant_id = int(day_2_df.participant_id.dropna().reset_index().participant_id[0])
            age = get_age(participant_id)
            if participant_id in participants_to_include:
                d_prime, miss_rate, fa_rate, source_acc = sub_memory(day_1_dictionary, day_2_df)
                sub_data = pd.DataFrame({'participant_id':participant_id,'age':age,'d_prime':d_prime,'miss_rate':miss_rate, 'fa_rate':fa_rate,
                    'source_acc':source_acc},index=[0])
                memory_df = pd.concat([memory_df,sub_data])
        except:
            continue
    return memory_df