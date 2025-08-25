space_bar = "<div><p><b>[Press the space bar to continue]</b></p></div>"

welcome_txt = "<div class='center'><p>Welcome to the third part of the study! First, you'll be shown pictures of items one at a time. For each picture, you have to decide if the item is typically found indoors or outdoors.</p><p>If you think it's usually found indoors, then press <b>v</b> key on your keyboard. If you think it's usually found outdoors, then press the <b>n</b> key.There will be reminders on the screen to help you remember which keys to press. </p><p>If you're not sure whether the item is an indoor item or an outdoor item, go ahead and take a guess but try your best not to skip that choice. </p></div>"

test_intro_txt = "<div class='center'><p>Now, let’s see how much you remember about the items you just saw.  For each item, you need to indicate if it was <b>old</b> by pressing the <b>v</b> key, <b>similar</b> by pressing the <b>b</b> key, or <b>new</b> by pressing the <b>n</b> key.</p><p>Old refers to an item that you saw before in the indoor/outdoor game that you just played, new refers to an item you have <b>not</b> seen before within the indoor/outdoor game, and similar refers to an item that is similar to an item you’ve seen before but is not exactly the same. </p><p>Before we begin, let’s go over some brief demonstrations to make sure you understand.</p></div>"

items_txt = "<div class='center'><p>First, let’s look at some items as if we were still doing the indoor/outdoor game.</p></div>"

mop_txt = "<div class='center'><p>When you saw this, you might have said indoor. </p><p><img src='run_exp/static/images/tutorial/example/125a.jpg' height='300'></p></div>"

baseball_txt = "<div class='center'><p>This maybe outdoor.</p><p><img src='run_exp/static/images/tutorial/example/076a.jpg' height='300'></p></div>"

trumpet_txt = "<div class='center'><p>Here, maybe indoor.</p><p><img src='run_exp/static/images/tutorial/example/129a.jpg' height='300'></p></div>"

gummies_txt = "<div class='center'><p>And, again, indoor. </p><p><img src='run_exp/static/images/tutorial/example/036a.jpg' height='300'></p></div>"

osn_txt = "<div class='center'><p>Now, for the old, similar, and new game.</p></div>"

old_1_txt = "<div class='center'><p>When you see this item below, you would say old because you’ve seen it before.</p><p><img src='run_exp/static/images/tutorial/example/129a.jpg' height='300'></p></div>"

new_1_txt = "<div class='center'><p>For this item, you would say new because you have't see anything like it in the indoor/outdoor game.</p><p><img src='run_exp/static/images/tutorial/example/142a.jpg' height='300'></p></div>"

similar_1a_txt = "<div class='center'><p>When you see this item below, you should say similar.</p><p><img src='run_exp/static/images/tutorial/example/125b.jpg' height='300'></p></div>"

similar_1b_txt = "<div class='center'><p>It’s similar to an item you saw previously today but <b>not exactly </b>the same. </p><p><img src='run_exp/static/images/tutorial/example/mop_comparison.png' height='300'></p></div>"

new_2_txt = "<div class='center'><p>Here, you’d call this new.</p><p><img src='run_exp/static/images/tutorial/example/039a.jpg' height='300'></p></div>"

old_2_txt = "<div class='center'><p>This one old.</p><p><img src='run_exp/static/images/tutorial/example/076a.jpg' height='300'></p></div>"

similar_2a_txt = "<div class='center'><p>This one, here, you’d call similar.</p><p><img src='run_exp/static/images/tutorial/example/036b.jpg' height='300'></p></div> "

similar_2b_txt = "<div class='center'><p>Because, again, it’s similar to an item you saw previously today but not exactly the same.</p><p><img src='run_exp/static/images/tutorial/example/gummy_comparison.png' height='300'></p></div>"

practice_txt="<div class='center'><p>Let’s practice a little to make sure you understand the difference between new, similar, and old. Let’s say you saw these three items in the indoor/outdoor game.</p><p> Try your best to remember these images because you’ll soon be tested on them in a practice game. In the practice game, you’ll be shown images and you’ll have to say if they are old (one of the three images belows), similar (similar to one of the images below but not exactly the same), or new (are not one of the images below nor similar to them).</p><p>Once you press the space bar you’ll be shown these images again but one at time. Then you’ll begin the practice game.</p><p><img src='run_exp/static/images/tutorial/test/three_indoor_outdoor.png' height='300'></p></div>"

correct_txt = "<div class='center'><p>That's correct!</p></div>"

practice_q1_txt="<div class='center'><p>If you were shown this item, would you say it was old, similar or new?</p><p>v:&nbsp old &nbsp&nbsp b:&nbsp similar &nbsp&nbsp n:&nbsp new</p><p><img src='run_exp/static/images/tutorial/test/051b.jpg' height='300'></p></div>"

incorrect_q1_txt = "<div class='center'><p>That’s incorrect. It’s new.</p></div>"

practice_q2_txt="<div class='center'><p>If you were shown this item, would you say it was old, similar or new?</p><p>v:&nbsp old &nbsp&nbsp b:&nbsp similar &nbsp&nbsp n:&nbsp new</p><p><img src='run_exp/static/images/tutorial/test/008a.jpg' height='300'></p></div>"

incorrect_q2_txt = "<div class='center'><p>That’s incorrect. It’s old.</p></div>"

practice_q3_txt="<div class='center'><p>If you were shown this item, would you say it was old, similar or new?</p><p>v:&nbsp old &nbsp&nbsp b:&nbsp similar &nbsp&nbsp n:&nbsp new</p><p><img src='run_exp/static/images/tutorial/test/011b.jpg' height='300'></p></div>"

incorrect_q3_txt = "<div class='center'><p>That’s incorrect. It’s similar.</p><p><img src='run_exp/static/images/tutorial/test/boot_comparison.png' height='300'></p></div>"

repeat_txt = "<div class='center'><p>Oops. you missed at least one of these questions. Let's try practicing again. </p></div>"

begin_text_txt = "<div class='center'><p>On to the real game where we’ll test your memory of items from the indoor/outdoor game. For each item, you need to indicate if the item is <b>old</b> by pressing the <b>v</b> key, <b>similar</b> by pressing the <b>b</b> key, or <b>new</b> by pressing the <b>n</b> key. </p></div>"

done_txt = "<div class='center'><p>You are finished with the third part of the study! You'll be invited to the fourth and final part in a week. You can press the space bar to end the game now. </p></div>"

var n_incorrect = 0;
var n_failures = 0;


var welcome = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_1_welcome.m4a",
  prompt:welcome_txt,
  choices: jsPsych.NO_KEYS,
	trial_ends_after_audio: true,
  on_finish: function(data) {
    data.trial_type = "welcome";
    data.subject_id = subject_id;
    data.participant_id = participant_id;
    data.age = age;
    data.gender = gender;
    data.prompt = welcome_txt;
  }
}

var move_forward = {
  type: 'html-keyboard-response',
  stimulus:welcome_txt,
  choices: ['space'],
  on_start: function(move_forward) {
    console.log('hi')
    var last_trial = jsPsych.data.get().last(1).values()[0];
    console.log(last_trial)
    move_forward.stimulus = last_trial.prompt.slice(0,-6).concat(space_bar);
  },
}

var test_intro = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_2_memory.m4a",
  prompt:test_intro_txt,
  choices: jsPsych.NO_KEYS,
  trial_ends_after_audio: true,
  on_finish: function(data) {
    data.trial_type = "test_intro";
    data.prompt = test_intro_txt;
  }
}

var items = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_3_items.m4a",
  prompt:items_txt,
  choices: jsPsych.NO_KEYS,
  trial_duration: 7500,
  //trial_ends_after_audio: true,
  on_finish: function(data) {
    data.trial_type = "items";
  }
}

var mop = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_4_mop.m4a",
  prompt:mop_txt,
  choices: jsPsych.NO_KEYS,
  //trial_ends_after_audio: true,
  trial_duration: 4500,
  on_finish: function(data) {
    data.trial_type = "mop";
  }
}

var baseball = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_5_baseball.m4a",
  prompt:baseball_txt,
  choices: jsPsych.NO_KEYS,
  //trial_ends_after_audio: true,
  trial_duration: 3500,
  on_finish: function(data) {
    data.trial_type = "baseball";
  }
}

var trumpet = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_6_trumpet.m4a",
  prompt:trumpet_txt,
  choices: jsPsych.NO_KEYS,
  //trial_ends_after_audio: true,
  trial_duration: 3500,
  on_finish: function(data) {
    data.trial_type = "trumpet";
  }
}

var gummies = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_7_gummies.m4a",
  prompt:gummies_txt,
  choices: jsPsych.NO_KEYS,
  //trial_ends_after_audio: true,
  trial_duration: 3500,
  on_finish: function(data) {
    data.trial_type = "gummies";
  }
}

var osn = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_8_osn.m4a",
  prompt:osn_txt,
  choices: jsPsych.NO_KEYS,
  //trial_ends_after_audio: true,
  trial_duration: 4500,
  on_finish: function(data) {
    data.trial_type = "osn";
  }
}

var old_1 = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_9_old_trumpet.m4a",
  prompt:old_1_txt,
  choices: jsPsych.NO_KEYS,
  //trial_ends_after_audio: true,
  trial_duration: 6500,
  on_finish: function(data) {
    data.trial_type = "old_1";
  }
}

var new_1 = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_10_new_balloon.m4a",
  prompt:new_1_txt,
  choices: jsPsych.NO_KEYS,
  //trial_ends_after_audio: true,
  trial_duration: 7500,
  on_finish: function(data) {
    data.trial_type = "new_1";
  }
}

var similar_1a = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_11a_similar_mop.m4a",
  prompt:similar_1a_txt,
  choices: jsPsych.NO_KEYS,
  //trial_ends_after_audio: true,
  trial_duration: 4500,
  on_finish: function(data) {
    data.trial_type = "similar_1a";
  }
}

var similar_1b = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_11b_similar_mop.m4a",
  prompt:similar_1b_txt,
  choices: jsPsych.NO_KEYS,
  //trial_ends_after_audio: true,
  trial_duration: 6500,
  on_finish: function(data) {
    data.trial_type = "similar_1b";
  }
}

var new_2 = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_12_new_stoplight.m4a",
  prompt:new_2_txt,
  choices: jsPsych.NO_KEYS,
  //trial_ends_after_audio: true,
  trial_duration: 3500,
  on_finish: function(data) {
    data.trial_type = "new_2";
  }
}

var old_2 = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_13_old_baseball.m4a",
  prompt:old_2_txt,
  choices: jsPsych.NO_KEYS,
  //trial_ends_after_audio: true,
  trial_duration: 3500,
  on_finish: function(data) {
    data.trial_type = "old_2";
  }
}

var similar_2a = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_14a_similar_gummies.m4a",
  prompt:similar_2a_txt,
  choices: jsPsych.NO_KEYS,
  //trial_ends_after_audio: true,
  trial_duration: 3500,
  on_finish: function(data) {
    data.trial_type = "similar_2a";
  }
}

var similar_2b = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_14b_similar_gummies.m4a",
  prompt:similar_2b_txt,
  choices: jsPsych.NO_KEYS,
  //trial_ends_after_audio: true,
  trial_duration: 7500,
  on_finish: function(data) {
    data.trial_type = "similar_2b";
  }
}


var practice = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_15_practice.m4a",
  prompt:practice_txt,
  choices: jsPsych.NO_KEYS,
  trial_ends_after_audio: true,
  on_finish: function(data) {
    data.trial_type = "practice";
    data.prompt = practice_txt;
  }
}

var planet = {
	type:'image-keyboard-response',
	stimulus: "run_exp/static/images/tutorial/test/008a.jpg",
	choices: jsPsych.NO_KEYS,
	trial_duration:2000,
	on_finish: function(data) {
		data.trial_type = 'planet'
	}
}

var boot = {
	type:'image-keyboard-response',
	stimulus: "run_exp/static/images/tutorial/test/011a.jpg",
	choices: jsPsych.NO_KEYS,
	trial_duration:2000,
	on_finish: function(data) {
		data.trial_type = 'boot'
	}
}

var lemon = {
	type:'image-keyboard-response',
	stimulus: "run_exp/static/images/tutorial/test/018a.jpg",
	choices: jsPsych.NO_KEYS,
	trial_duration:2000,
	on_finish: function(data) {
		data.trial_type = 'lemon'
	}
}


var correct = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_17_correct.m4a",
  prompt:correct_txt,
  choices: jsPsych.NO_KEYS,
  trial_ends_after_audio: true,
  on_finish: function(data) {
    console.log('done')
    data.trial_type = "correct";
    data.prompt = correct_txt;
  }
}




var incorrect_q3 = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_20_incorrect_similar.m4a",
  prompt:incorrect_q3_txt,
  choices: jsPsych.NO_KEYS,
  trial_ends_after_audio: true,
  on_finish: function(data) {
    data.trial_type = "incorrect_q3";
    data.prompt = incorrect_q3_txt;
  }
}


var practice_q3 = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_16_practice_question.m4a",
  prompt:practice_q3_txt,
  choices: ['v','b','n'],
  on_finish: function(data) {
    data.trial_type = "practice_q3";
    let last_trial = jsPsych.data.get().last(1).values()[0];
    let choice = test_key_dict[last_trial.key_press]
    console.log(choice)
    if (choice == 'similar') {
      jsPsych.addNodeToEndOfTimeline({timeline: [correct,move_forward],}, jsPsych.resumeExperiment);
    } else {
      n_incorrect += 1;
      jsPsych.addNodeToEndOfTimeline({timeline: [incorrect_q3,move_forward],}, jsPsych.resumeExperiment);
    }

    if ((n_incorrect > 0) & (n_failures < 2)) {
      n_failures += 1
      n_incorrect = 0
      jsPsych.addNodeToEndOfTimeline({timeline: [repeat,move_forward,practice_q1],}, jsPsych.resumeExperiment);
    } else {
      jsPsych.addNodeToEndOfTimeline({timeline: [begin_text,move_forward],}, jsPsych.resumeExperiment);
      make_test_phase()
    }
  }
}


var incorrect_q2 = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_19_incorrect_old.m4a",
  prompt:incorrect_q2_txt,
  choices: jsPsych.NO_KEYS,
  trial_ends_after_audio: true,
  on_finish: function(data) {
    data.trial_type = "incorrect_q2";
    data.prompt = incorrect_q2_txt;
  }
}

var practice_q2 = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_16_practice_question.m4a",
  prompt:practice_q2_txt,
  choices: ['v','b','n'],
  on_finish: function(data) {
    data.trial_type = "practice_q2";
    let last_trial = jsPsych.data.get().last(1).values()[0];
    let choice = test_key_dict[last_trial.key_press]
    console.log(choice)
    if (choice == 'old') {
      jsPsych.addNodeToEndOfTimeline({timeline: [correct,move_forward,practice_q3],}, jsPsych.resumeExperiment);

    } else {
      n_incorrect += 1;
      jsPsych.addNodeToEndOfTimeline({timeline: [incorrect_q2,move_forward,practice_q3],}, function(){},jsPsych.resumeExperiment);
    }
  }
}

var incorrect_q1 = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_18_incorrect_new.m4a",
  prompt:incorrect_q1_txt,
  choices: jsPsych.NO_KEYS,
  trial_ends_after_audio: true,
  on_finish: function(data) {
    data.trial_type = "incorrect_q1";
    data.prompt = incorrect_q1_txt;

  }
}

var practice_q1 = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_16_practice_question.m4a",
  prompt:practice_q1_txt,
  choices: ['v','b','n'],
  on_finish: function(data) {
    data.trial_type = "practice_q1";
    let last_trial = jsPsych.data.get().last(1).values()[0];
    console.log(last_trial)
    let choice = test_key_dict[last_trial.key_press]
    console.log(choice)
    if (choice == 'new') {
      console.log('hi')
      jsPsych.addNodeToEndOfTimeline({timeline: [correct,move_forward,practice_q2],}, jsPsych.resumeExperiment);

    } else {
      n_incorrect += 1;
      jsPsych.addNodeToEndOfTimeline({timeline: [incorrect_q1,move_forward,practice_q2],}, jsPsych.resumeExperiment);
    }
  }
}


var repeat = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_21_practice_again.m4a",
  prompt:repeat_txt,
  choices: jsPsych.NO_KEYS,
  trial_ends_after_audio: true,
  on_finish: function(data) {
    data.trial_type = "repeat";
    data.prompt = repeat_txt;
  }
}

var begin_text = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_22_begin_test.m4a",
  prompt:begin_text_txt,
  choices: jsPsych.NO_KEYS,
  trial_ends_after_audio: true,
  on_finish: function(data) {
    data.trial_type = "begin_text";
    data.prompt = begin_text_txt;
  }
}

var all_done = {
	type: 'audio-keyboard-response',
  stimulus:"run_exp/static/audio/clip_23_all_done.m4a",
  prompt:done_txt,
  choices: jsPsych.NO_KEYS,
  trial_ends_after_audio: true,
  on_finish: function(data) {
    data.trial_type = "all_done";
    data.prompt = done_txt;
  }
}
