// Set up timeline elements

var timeline = [];

var my_id = jsPsych.randomization.randomID(15);
var my_age;
var my_gender;
var my_ethnicity;

// condition from URL variable
var condition = jsPsych.data.getURLVariable('condition')
jsPsych.data.addProperties({condition: condition});

if (condition == "1") {
    my_folder = "condition1_uhumno";
} else if (condition == "2") {
    my_folder = "condition2_nouhum";
} else {
    my_folder = "condition3_umnouh";
}

// Intro page
var welcome = {
    type: 'html-keyboard-response',
    stimulus: 'Welcome to the experiment. Press any key to begin.'
}
timeline.push(welcome)

// Ask the participant for demo info and save it to data
var demographic_questions = {
    type: 'survey-text',
    questions: [
        {prompt: "What is your age?", required: true},
        {prompt: "What is your gender?", required: true},
        {prompt: "What is your ethnicity?", required: true},
    ],
    on_finish: function(data){
        var responses = JSON.parse(data.responses);
        var age = responses.Q0;
        my_age = age;
        var gender = responses.Q1;
        my_gender = gender;
        var ethnicity = responses.Q2;
        my_ethnicity = ethnicity;
        jsPsych.data.addProperties({
            subject_id: my_id,
            gender: my_gender,
            age: my_age,
            ethnicity: my_ethnicity}
        );
    }
};
timeline.push(demographic_questions);

// Set up scales
var scale_fem   = ["not at all feminine"      , "" , "" , "" , "very feminine"];
var scale_masc  = ["not at all masculine"     , "" , "" , "" , "very masculine"];
var scale_young = ["not at all young"         , "" , "" , "" , "very young"];
var scale_queer = ["not at all queer"         , "" , "" , "" , "very queer"];
var scale_can   = ["not at all Canadian"      , "" , "" , "" , "very Canadian"];
var scale_int   = ["not at all intelligent"   , "" , "" , "" , "very intelligent"];
var scale_hes   = ["not at all hesitant"      , "" , "" , "" , "very hesitant"];
var scale_pol   = ["not at all polite"        , "" , "" , "" , "very polite"];
var scale_cas   = ["not at all casual"        , "" , "" , "" , "very casual"];
var scale_fri   = ["not at all friendly"      , "" , "" , "" , "very friendly"];

var instructions = {
    type: "html-keyboard-response",
    stimulus: `<p>In this study, you will listen to some recordings.</p>

    <p>These recordings are taken from the middle of a conversation which is
    still ongoing: what you hear is not the full conversation, only a part of
    it.</p>

    <p>Your task will be to decide what you think about one of the participants
    in the conversation: the first person to speak. You'll first be asked to
    rate them on different scales, and then on the next page you will be able to
    type in any other comments you have.</p>

    <p>Try to answer the questions at a quick pace, using your gut feeling,
    without trying to think too hard about them for too long. </p>

    <p>When you are ready, press any key to begin the experiment.</p>`
};
timeline.push(instructions)

var likert_page = {
    type: 'survey-likert',
    preamble: function(){return ('<p><em>Listen to the conversation.</em></p>' +
        '<p><audio controls><source src="' +
        jsPsych.timelineVariable('audio', true) +
        '"</source></audio></p>' +
        '<p><em>The person who spoke first sounds...</em></p>'
    );
    },
    questions: [
        {prompt: "" , labels: scale_fem   , required: true} ,
        {prompt: "" , labels: scale_masc  , required: true} ,
        {prompt: "" , labels: scale_young , required: true} ,
        {prompt: "" , labels: scale_queer , required: true} ,
        {prompt: "" , labels: scale_can   , required: true} ,
        {prompt: "" , labels: scale_int   , required: true} ,
        {prompt: "" , labels: scale_hes   , required: true} ,
        {prompt: "" , labels: scale_pol   , required: true} ,
        {prompt: "" , labels: scale_cas   , required: true} ,
        {prompt: "" , labels: scale_fri   , required: true} ,
    ],
    data: {
        type: 'quant-results',
        stim: jsPsych.timelineVariable('stim'),
        variant: jsPsych.timelineVariable('variant'),
    },
};

var text_page = {
    type: 'survey-text',
    preamble: function(){return ('<p><em>If you want, listen again.</em></p>' +
        '<p><audio controls><source src="' +
        jsPsych.timelineVariable('audio', true) +
        '"</source></audio></p>'
        );
    },
    questions: [
        {prompt: `Is there anything else you want to say about the conversation
        you just listened to? You can enter as much or as little text as you
        like.`,
        required: false},
    ],
    data: {
        type: 'qual-results',
        stim: jsPsych.timelineVariable('stim'),
        variant: jsPsych.timelineVariable('variant'),
    },
};

var test_procedure = {
    timeline: [likert_page, text_page],
    timeline_variables: [
        { audio: 'sound/' + my_folder + '/01.wav', stim: '1', order: 'second', variant: 'um'},
        { audio: 'sound/' + my_folder + '/02.wav', stim: '2', order: 'second', variant: 'uh'},
        { audio: 'sound/' + my_folder + '/03.wav', stim: '3', order: 'second', variant: 'uh'},
        { audio: 'sound/' + my_folder + '/04.wav', stim: '4', order: 'second', variant: 'uh'},
        { audio: 'sound/' + my_folder + '/05.wav', stim: '5', order: 'second', variant: 'uh'},
        { audio: 'sound/' + my_folder + '/06.wav', stim: '6', order: 'second', variant: 'uh'},
        { audio: 'sound/filler/07.wav', stim: '7', order: 'second', variant: 'uh'},
        { audio: 'sound/filler/08.wav', stim: '8', order: 'second', variant: 'uh'},
        { audio: 'sound/filler/09.wav', stim: '9', order: 'second', variant: 'uh'},
        { audio: 'sound/filler/10.wav', stim: '10', order: 'second', variant: 'uh'},
        { audio: 'sound/filler/11.wav', stim: '11', order: 'second', variant: 'uh'},
        { audio: 'sound/filler/12.wav', stim: '12', order: 'second', variant: 'uh'},
        { audio: 'sound/filler/13.wav', stim: '13', order: 'second', variant: 'uh'},
        { audio: 'sound/filler/14.wav', stim: '14', order: 'second', variant: 'uh'},
        { audio: 'sound/filler/15.wav', stim: '15', order: 'second', variant: 'uh'},
        { audio: 'sound/filler/16.wav', stim: '16', order: 'second', variant: 'uh'},
    ],
    randomize_order: true
};
timeline.push(test_procedure);

var prebrief = {
    type: 'survey-text',
    preamble: `<p><strong> You have finished listening to all of the recordings.
    Please answer the following questions about the experiment.</strong></p>`,
    questions: [
        {prompt: "What do you think the experiment was about?", required: true},
        {prompt: `Did you notice anything interesting about the way language was
            used in the recordings you heard? If so, what?`, required: false},
        {prompt: `Do you have any general comments about the experiment and your
            experience doing the experiment?`, required: false},
    ],
    data: {
        type: 'prebrief'
    }
};
timeline.push(prebrief)

var debrief = {
    type: "html-keyboard-response",
    stimulus: " " +
        `<p>You have completed the main portion of the study.</p>

         <p>Please tell the experimenter that you are done.</p>

         <p>The experimenter will debrief you on the purpose of the experiment.
         Then, there will then be a few more questions for you to answer. </p>

         <p>Once you have been debriefed, press any key to continue.</p>`
};
timeline.push(debrief)

var postbrief = {
    type: 'survey-text',
    preamble: '<p><strong> Please answer these final questions about the experiment.</p></strong>',
    questions: [
        {prompt: "Were you surprised to learn that the experiment was about uh and um? Why or why not?", required: true},
        {prompt: "Do you have any final comments about your experience participating in this experiment?", required: false},
    ],
    data: {
        type: 'afterbrief'
    }
};
timeline.push(postbrief)

var ending = {
    type: "html-keyboard-response",
    stimulus: " " +
        "<p>Thank you for participating in this experiment! Press any key to end the experiment.</p>"
};
timeline.push(ending)

jsPsych.init({
    timeline: timeline,
    on_finish: function() {
        jsPsych.data.get().localSave('csv', my_id + '.csv');
        jsPsych.data.displayData();
    }
});

