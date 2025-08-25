## MBMF ANALYSIS ##
# Kate Nussenbaum - katenuss@nyu.edu
# Adapted by: Nora Harhen- noraharhen@nyu.edu

#### LIBRARIES AND FUNCTIONS ####
library(tidyverse)
library(glue)
library(magrittr)
library(gridExtra)
library(afex)
library(sjPlot)
library(lme4)

setwd("~/Desktop/Projects/context_bandits/HarhenBornsteinHartley2025_Context_Bandits/other_tasks/two_step_task/data_analysis/")

# age group function
# Add age group variable to data frame with raw ages
addAgeGroup <- function(df, ageColumn){
  ageColumn <- enquo(ageColumn)
  df %>% mutate(age_group = case_when((!! ageColumn) < 13 ~ "Children",
                                      (!! ageColumn) > 12.9 & (!! ageColumn) < 18 ~ "Adolescents",
                                      (!! ageColumn) >= 18 ~ "Adults"), 
                age_group = factor(age_group, levels = c("Children", "Adolescents", "Adults")))
  
}

#define new function so that scale returns a vector, not a matrix
scale_this <- function(x) as.vector(scale(x))


#get list of files
data_files <- list.files(path = "../data/",pattern="*.csv")

#initialize data frame
data <- data.frame()

# Read in data
for (i in c(1:length(data_files))){
  sub_data <- read_csv(show_col_types = FALSE,glue("../data/{data_files[i]}")) 
  print(glue("data_combined/{data_files[i]}"))
  print(unique(sub_data$participant_id))
  data <- rbind(data, sub_data)
}

data <- data[!duplicated(data), ]


#get rid of yuck columns
data %<>% 
  select(c(trial_index,
           participant_id, 
           choice,
           rt, 
           trial_stage,
           transition,
           practice_trial,
           reward)) %>%
  filter(practice_trial == "real")

#read in subject ages
sub_ages <- read_csv('sub_ages.csv') 
sub_ages$participant_id<-as.numeric(sub_ages$participant_id)
sub_ages$age <- as.numeric(sub_ages$age)

#combine with data
data <- full_join(data, sub_ages, by = "participant_id")
data$age <- as.numeric(data$age)

#format data
data <- data %>%
  group_by(participant_id,) %>%
  mutate(temp_trial = rank(trial_index)) %>%
  mutate(trial = ceiling(temp_trial/2)) %>%
  ungroup() %>%
  select(-trial_index, -temp_trial) %>%
  pivot_wider(names_from = c(trial_stage), 
              values_from = c(transition, reward, choice, rt), values_fn = list) %>% 
  unnest(cols = everything() ) %>%
  select(participant_id, practice_trial, age, trial, transition_2, reward_2, choice_1, choice_2, rt_1, rt_2) %>%
  rename(transition = transition_2,
         reward = reward_2) %>%
  drop_na()

final_sub_list <- c(22,29,42,70,71,72,124,132,136,139,171,179,190,220,229,247,293,337,386,392,395,401,421,423,463,472,478,534,547,592,603,618,658,659,672,702,709,710,716,717,737,738,741,754,758,784,787,804,844,875,877,891,918,923,928,936,946,957,958,959,965,1059,1183,1225,1249,1250,1302)

#add columns for previous reward, previous transition type, and "stay"
data <- data %>%
  group_by(participant_id,) %>%
  mutate(previous_reward = lag(reward),
         previous_transition = lag(transition),
         previous_choice = lag(choice_1)) %>%
  ungroup() %>%
  mutate(stay = case_when(previous_choice == choice_1 ~ 1,
                          previous_choice != choice_1 ~ 0)) %>%
  filter(trial > 9)

run_only_cb_included <- FALSE
if (run_only_cb_included) { # only include subjects who are included in the final subject list for context bandits (the main task)
  data<-filter(data,participant_id %in% final_sub_list)
}
final_sub_count <- length(unique(data$participant_id))

#relabel transitions and reward
data$previous_reward <- factor(data$previous_reward, labels = c("No Reward", "Reward"), ordered = F)

#sanity check - ensure rare transitions were actually rare
transition_probs <- data %>%
  group_by(transition) %>%
  summarize(N = n())

#add age groups to data 
data <- addAgeGroup(data, age)

# Z-score age
data$age_z <- scale_this(data$age)
data$age_z <- as.numeric(data$age_z)

data$participant_id <- as.character(data$participant_id)

stay.model <- glmer(stay ~ previous_reward * previous_transition * age_z + (previous_reward * previous_transition|participant_id), 
                    family = "binomial", 
                    data = data, 
                    control = glmerControl(optimizer = "bobyqa"))
summary(stay.model)

stay_stats <- data %>%
  group_by(previous_reward, previous_transition, participant_id, age_group) %>%
  summarize(mean_stay = mean(stay, na.rm = T),
            n = n()) %>%
  drop_na 

# Plot proportion of stay trials by age group 
stay_stats_group <- stay_stats %>%
  group_by(previous_reward, previous_transition, age_group) %>%
  summarize(stay_prop = mean(mean_stay),
            sd_stay = sd(mean_stay, na.rm = T),
            N = n(),
            se_stay = sd_stay/sqrt(N))

n_children <- stay_stats_group$N[1]
n_adolescents <- stay_stats_group$N[2]
n_adults <- stay_stats_group$N[3]

#create age group labels
age_group_labels = c(Children = glue("Children (n = {n_children})"),
                     Adolescents = glue("Adolescents (n = {n_adolescents})"),
                     Adults = glue("Adults (n = {n_adults})"))

stay_plot <- ggplot(stay_stats_group, aes(x = factor(previous_reward, levels=c("Reward", "No Reward")), 
                                          y = stay_prop,
                                          fill = previous_transition)) +
  geom_bar(position = "dodge", stat = "identity", color = "black") +
  geom_errorbar(position = position_dodge(width = .9), aes(ymin = stay_prop - se_stay, ymax = stay_prop + se_stay), width = 0) + 
  facet_wrap(~age_group, labeller = labeller(age_group = age_group_labels)) +
  xlab("Outcome of Previous Trial") +
  ylab("Proportion of of First-Stage Stays") +
  coord_cartesian(ylim = c(.5, 1)) +
  scale_fill_manual(values = c("royalblue4", "firebrick2"), name = "Previous Trial Transition") +
  theme_minimal() +
  theme(panel.grid = element_blank(),
        axis.line = element_line(size = .2),
        legend.position = "top",
        strip.text.x = element_text(size = 10.5),
        axis.title = element_text(size = 10),
        axis.text = element_text(size = 9.5)
  )
stay_plot

# #save group plot
ggsave(filename = glue("plots/stay_plot_age_group.png"), plot = last_plot(), width = 5, height = 3, units = "in", dpi = 300)
