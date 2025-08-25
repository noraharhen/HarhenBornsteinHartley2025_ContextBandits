'use strict';

////////// PAVLOVIA //////////////////////////////////////////////////////////////////////////
var pavlovia_init = {
	type: "pavlovia",
	command: "init"
};

var pavlovia_finish = {
	type: "pavlovia",
	command: "finish"
	};


function randomize(array) {
  array = array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    return array;
}

var learn_key_dict = {
  86: 'indoor', // i
	78: 'outdoor', // o
}

var test_key_dict = {
	86: 'old', // v
  66: 'similar', // b
	78: 'new', // n
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// get subj id from url
var urlvar = jsPsych.data.urlVariables()
var participant_id = jsPsych.data.getURLVariable('participant_ID');
var subject_id = jsPsych.data.getURLVariable('subject_ID');
var age = jsPsych.data.getURLVariable('age');
var gender = jsPsych.data.getURLVariable('gender');


var learn_ind = 0;
var test_ind = 0;
var n_learn_trial = 64;
var n_test_trial = 96;
var path_prefix = 'run_exp/static/images/'
// randomize order of learning and test phase
learn_trial_stim = randomize(learn_trial_stim);

test_trial_stim = randomize(test_trial_stim);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var learn_trial = {
	type:'image-keyboard-response',
	stimulus: path_prefix.concat(learn_trial_stim[learn_ind]['stim']),
	choices: ['v','n'],
	trial_duration:2000,
	prompt:"<div><p><b>v:&nbsp indoor &nbsp&nbsp&nbsp n:&nbspoutdoor</b></p></div>",
	on_start: function(learn_trial) {
		console.log(learn_ind)
		console.log(learn_trial_stim.length)
		learn_trial.stimulus=path_prefix.concat(learn_trial_stim[learn_ind]['stim'])
	},
	on_finish: function(data) {
		data.phase = 'learn'
		data.trial_type = 'image'
		data.condition =learn_trial_stim[learn_ind]['cond']
	}
}

var show_learn_choice = {
	type:'image-keyboard-response',
	stimulus: path_prefix.concat(learn_trial_stim[learn_ind]['stim']),
	choices: jsPsych.NO_KEYS,
	on_start: function(show_learn_choice) {
		show_learn_choice.stimulus=path_prefix.concat(learn_trial_stim[learn_ind]['stim'])
		var last_trial_data = jsPsych.data.get().last(1).values()[0];
		var last_trial_choice = last_trial_data.key_press;
		if (last_trial_choice==null) {
			show_learn_choice.stimulus = path_prefix.concat("blank.png")
			show_learn_choice.prompt = "<div><p style='color:red'><b>Try making your choices quicker!</b></p></div>";
		} else {
			show_learn_choice.prompt = "<div><p><b>".concat(learn_key_dict[last_trial_choice],"</b></p></div>");
		}
		show_learn_choice.trial_duration = (2000 - last_trial_data.rt);

	},
	on_finish: function(data) {
		data.phase = 'learn';
		data.trial_type = 'show_choice';
		data.condition =learn_trial_stim[learn_ind]['cond'];
		learn_ind += 1
	}
}

var intertrial = {
	type: 'html-keyboard-response',
  stimulus:"<p></p>",
  choices: jsPsych.NO_KEYS,
	trial_duration: 500
}

var test_trial = {
	type:'image-keyboard-response',
	stimulus:	path_prefix.concat(test_trial_stim[test_ind]['stim']),
	choices: ['v','b','n'],
	trial_duration: 3000,
	prompt:"<div><p><b>v:&nbsp old &nbsp&nbsp b:&nbsp similar &nbsp&nbsp n:&nbsp new</b></p></div>",
	on_start: function(test_trial) {
		console.log(test_ind)
		console.log(test_trial_stim.length)
		test_trial.stimulus = path_prefix.concat(test_trial_stim[test_ind]['stim'])
	},
	on_finish: function(data) {
		data.phase = 'test'
		data.trial_type = 'image'
		data.condition =test_trial_stim[test_ind]['cond']
		data.lure_bin =test_trial_stim[test_ind]['lbin']
	}
}


var show_test_choice = {
	type:'image-keyboard-response',
	stimulus:	path_prefix.concat(test_trial_stim[test_ind]['stim']),
	choices: jsPsych.NO_KEYS,
	trial_duration: 500,
	on_start: function(show_test_choice) {
		show_test_choice.stimulus = path_prefix.concat(test_trial_stim[test_ind]['stim'])
		var last_trial_data = jsPsych.data.get().last(1).values()[0];

		var last_trial_choice = last_trial_data.key_press;
		if (last_trial_choice==null) {
			show_learn_choice.stimulus = path_prefix.concat("blank.png")
			show_test_choice.prompt = "<div><p style='color:red'><b>Try making your choices quicker!</b></p></div>";
		} else {
			show_test_choice.prompt = "<div><p><b>".concat(test_key_dict[last_trial_choice],"</b></p></div>");
		}

	},
	on_finish: function(data) {
		data.phase = 'test';
		data.trial_type = 'show_choice';
		data.condition =test_trial_stim[test_ind]['cond'];
		test_ind += 1
	}
}

function make_test_phase() {
	for (let i = 0; i < n_test_trial; i++) {
		jsPsych.addNodeToEndOfTimeline({timeline: [test_trial,show_test_choice,intertrial],},jsPsych.resumeExperiment);
	}
	jsPsych.addNodeToEndOfTimeline({timeline: [all_done,move_forward,pavlovia_finish],},jsPsych.resumeExperiment);

}

var timeline = []

timeline.push({
	type: 'fullscreen',
	fullscreen_mode: true
});
//
timeline.push(pavlovia_init);

//learn phase
timeline.push(welcome);
timeline.push(move_forward);
for (let i = 0; i < n_learn_trial; i++) {
	timeline.push(learn_trial);
	timeline.push(show_learn_choice);
	timeline.push(intertrial);
}

//test phase
timeline.push(test_intro);
timeline.push(move_forward);
timeline.push(items);
timeline.push(mop);
timeline.push(baseball);
timeline.push(trumpet);
timeline.push(gummies);
timeline.push(osn);
timeline.push(old_1);
timeline.push(new_1);
timeline.push(similar_1a);
timeline.push(similar_1b);
timeline.push(new_2);
timeline.push(old_2);
timeline.push(similar_2a);
timeline.push(similar_2b);
timeline.push(practice);
timeline.push(move_forward);
timeline.push(planet);
timeline.push(boot);
timeline.push(lemon);
timeline.push(practice_q1);


jsPsych.init({
  timeline: timeline,
  display_element: 'jspsych-target',
	preload_images: all_images,
	preload_audio: all_audio,
	use_webaudio:false,
	on_trial_start: function(data) {
		var interaction_data = jsPsych.data.getInteractionData();
		var blur_events = interaction_data.filter({event: 'blur'});
		var focus_events = interaction_data.filter({event: 'focus'});
		var fullscreenenter_events = interaction_data.filter({event: 'fullscreenenter'});
		var fullscreenexit_events = interaction_data.filter({event: 'fullscreenexit'});
		jsPsych.data.get().addToLast({interactions: interaction_data.csv()});
		jsPsych.data.get().addToLast({blur_events: blur_events.csv()});
		jsPsych.data.get().addToLast({focus_events: focus_events.csv()});
		jsPsych.data.get().addToLast({fullscreenenter_events: fullscreenenter_events.csv()});
		jsPsych.data.get().addToLast({fullscreenexit_events: fullscreenexit_events.csv()});},
	on_interaction_data_update: function (data) {
		var interaction_data = jsPsych.data.getInteractionData();
		var blur_events = interaction_data.filter({event: 'blur'});
		var focus_events = interaction_data.filter({event: 'focus'});
		var fullscreenenter_events = interaction_data.filter({event: 'fullscreenenter'});
		var fullscreenexit_events = interaction_data.filter({event: 'fullscreenexit'});
		jsPsych.data.get().addToLast({interactions: interaction_data.csv()});
		jsPsych.data.get().addToLast({blur_events: blur_events.csv()});
		jsPsych.data.get().addToLast({focus_events: focus_events.csv()});
		jsPsych.data.get().addToLast({fullscreenenter_events: fullscreenenter_events.csv()});
		jsPsych.data.get().addToLast({fullscreenexit_events: fullscreenexit_events.csv()});},
	on_close: function (data) {
		var interaction_data = jsPsych.data.getInteractionData();
		var blur_events = interaction_data.filter({event: 'blur'});
		var focus_events = interaction_data.filter({event: 'focus'});
		var fullscreenenter_events = interaction_data.filter({event: 'fullscreenenter'});
		var fullscreenexit_events = interaction_data.filter({event: 'fullscreenexit'});
		jsPsych.data.get().addToLast({interactions: interaction_data.csv()});
		jsPsych.data.get().addToLast({blur_events: blur_events.csv()});
		jsPsych.data.get().addToLast({focus_events: focus_events.csv()});
		jsPsych.data.get().addToLast({fullscreenenter_events: fullscreenenter_events.csv()});
		jsPsych.data.get().addToLast({fullscreenexit_events: fullscreenexit_events.csv()});},
  on_finish: function() {
		var interaction_data = jsPsych.data.getInteractionData();
		var blur_events = interaction_data.filter({event: 'blur'});
		var focus_events = interaction_data.filter({event: 'focus'});
		var fullscreenenter_events = interaction_data.filter({event: 'fullscreenenter'});
		var fullscreenexit_events = interaction_data.filter({event: 'fullscreenexit'});
		jsPsych.data.get().addToLast({interactions: interaction_data.csv()});
		jsPsych.data.get().addToLast({blur_events: blur_events.csv()});
		jsPsych.data.get().addToLast({focus_events: focus_events.csv()});
		jsPsych.data.get().addToLast({fullscreenenter_events: fullscreenenter_events.csv()});
		jsPsych.data.get().addToLast({fullscreenexit_events: fullscreenexit_events.csv()});

		document.body.innerHTML = '<p> <center>Thank you for participating in the final part of the study! Please wait while your data saves. After 10 seconds, you will be redirected to Spark. </center> </p>';
      setTimeout(function () {var end_link = "https://spark.hartleylab.org/completed/".concat(subject_id); window.location = end_link;}, 10000)
}
})
