var subtitle_content = '';
var is_video_running = false;
var last_change = '';
var current_words = '';

var is_caption_text_valid = function() {
    var current_caption_obj = document.getElementsByClassName('captions-text')[0];
    var current_caption_text;

    if (current_caption_obj != null) {
        current_caption_text = current_caption_obj.innerText;
        current_words = current_caption_text.split('\n')[0];
    } else {
        return false;
    }

    if (current_caption_text.search('\n') === -1)
        return false;

    if (current_words === last_change)
        return false;

    return true;
};

var get_caption_text = function() {
    if ( is_caption_text_valid() ) {
        console.log(current_words);
        console.log('---');

        last_change = current_words;

        return start_getting_captions();
    };

    return start_getting_captions();
};

var start_getting_captions = function() {
    if (is_video_running) {
        setTimeout(get_caption_text, 500);
    } else {
        console.log("Video not running");
    }
};

var set_running = function() {
    setTimeout(function() {
        if (document.getElementById('movie_player').className.search('playing-mode') > -1){
            is_video_running = true;
        } else {
            is_video_running = false;
        }

        if (is_video_running)
            return start_getting_captions();
    }, 300);
};

document.getElementsByClassName('ytp-play-button ytp-button')[0].addEventListener('click', set_running);
