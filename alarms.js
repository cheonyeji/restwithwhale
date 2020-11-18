let power = document.querySelectorAll('.powerBtn');
let transbtn = document.querySelectorAll('.togBtn');
let switches = document.querySelectorAll('.checkbox');
let addTime;
let storage = chrome.storage.local;

whale.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if (message.msg === "toggle off") {
        $('#'+message.data.content).trigger('click');
    }
    if(message.msg === "alarm create"){
        RecreateAlarm(message.data.content);
    }
});

function currentDate(){
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();

    return {year, month, date, hours, minutes, seconds};
}

function createAlarm(name, addTime) {
    console.log(name +' 알람이 생성됩니다');
    chrome.alarms.create(name, {when: Date.now()+addTime});
}

function clearAlarm(name) {
    chrome.alarms.clear(name);
    console.log(name+' 알람이 해제됩니다');

}

function RecreateAlarm(name) {
    console.log(name +' 알람이 재생성됩니다');
    chrome.alarms.create(name, {when: Date.now()+86400000});
}

function checkInput(transbtn_id, parent, amCheck){
    let hours;
    let minutes;
    let title;
    let date;

    if(transbtn_id == 'transBtn0'){
        hours = parent.querySelector('.hour').value;
        minutes = parent.querySelector('.min').value;

        if(!(hours == "")&&!(minutes=="")){
            if(amCheck){
                if(hours == 12)hours = 0;
            }else{
                hours = Number(hours) + 12;
                if(hours == 24)hours = 12;
            }
            addTime = calculate_eyeAlarm(hours, minutes);
            return true;
        }
        else return false;

    }else{
        hours = parent.querySelector('.hour').value;
        minutes = parent.querySelector('.min').value;
        title = parent.querySelector('.title').value;
        date = parent.querySelector('.date').value;


        if(!(hours == "")&&!(minutes=="")&&!(title=="")&&!(date=="")){
            if(amCheck == true){
                if(hours == 12)hours = 0;
            }else{
                hours = Number(hours) +12;
                if(hours == 24)hours = 12;
            }
            addTime = calculate_scheduleAlarm(hours, minutes, date);
            return true;
        }
        else return false;
    }
}

function calculate_eyeAlarm(input_hours, input_minutes) {

    const {year, month, date, hours, minutes, seconds} = currentDate();
    
    let alarm_Date = new Date(year, month, date, input_hours, input_minutes, 0).getTime();
    let current_Date = new Date(year, month, date, hours, minutes, seconds).getTime();
    let addTime = alarm_Date - current_Date;
    
    if(addTime<0){
        addTime = addTime+86400000;
    }

    return addTime;
}

function calculate_scheduleAlarm(input_hours, input_minutes, input_date) {

    let dateValue = input_date.replace(/\-/g, ""); 
    
    let input_year = dateValue.substring(0,4);
    let input_month = dateValue.substring(4,6)-1;
    let input_dates = dateValue.substring(6,8);
    
    const {year, month, date, hours, minutes, seconds} = currentDate();
    
    let alarm_Date = new Date(input_year, input_month, input_dates, input_hours, input_minutes, 0).getTime();
    let current_Date = new Date(year, month, date, hours, minutes, seconds).getTime();
    let addTime = alarm_Date - current_Date;

    return addTime;
}

var replaceNotInt = /[^0-9]/gi;
$(document).ready(function(){
        
    $(".hour").on("focusout", function() {
        var x = $(this).val();
            if (x.length > 0) {
                if (x.match(replaceNotInt)) {
                   x = x.replace(replaceNotInt, "");
                }
                $(this).val(x);
            }
        }).on("keyup", function() {
            $(this).val($(this).val().replace(replaceNotInt, ""));
            if (this.value > 12 || this.value < 0) {
                this.value = '';
            } 
    });
});

$(document).ready(function(){
        
    $(".min").on("focusout", function() {
        var x = $(this).val();
            if (x.length > 0) {
                if (x.match(replaceNotInt)) {
                   x = x.replace(replaceNotInt, "");
                }
                $(this).val(x);
            }
        }).on("keyup", function() {
            $(this).val($(this).val().replace(replaceNotInt, ""));
            if (this.value > 59 || this.value < 0) {
                this.value = '';
            } 
    });
});

$('.hour').on('mousewheel',function(e){
    e.preventDefault();
    var num=Number($(this).val());
    if(e.originalEvent.wheelDelta > 0){
        if(num>=12) { $(this).val('12'); }
        else $(this).val(num+1);
    } else {
        if(num<=1) {$(this).val('1');} 
        else $(this).val(num-1);
    }
})
$('.min').on('mousewheel',function(e){
    e.preventDefault();
    var num=Number($(this).val());
    if(e.originalEvent.wheelDelta > 0){
        if(num>=59) { $(this).val('59'); }
        else $(this).val(num+1);
    } else {
        if(num<=0) {$(this).val('0');} 
        else $(this).val(num-1);
    }
})

$('.noteBtn').click(function() {
    let parent =this.parentNode.parentNode;
    if($(parent.querySelector('.memo_area')).css("display") == 'none'){
        $(parent.querySelector('.memo_area')).css('display','block');
    } else {
        $(parent.querySelector('.memo_area')).css('display','none');
    }
    
    $(this).css({
        'background':'url(img/note_on.png)',
        'background-repeat':'no-repeat',
        'background-size': 'contain'
    });
});

$(function() {
    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd'
        ,showMonthAfterYear:true
        ,minDate: 0
        ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] 
        ,monthNames: ['년 1월','년 2월','년 3월','년 4월','년 5월','년 6월','년 7월','년 8월','년 9월','년 10월','년 11월','년 12월'] 
        ,dayNamesMin: ['일','월','화','수','목','금','토']
        ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] 
    })
});

$('.date').each(function(){
    $(this).datepicker();
});

$('#datepicker1').datepicker();
$('#datepicker2').datepicker();
$('#datepicker3').datepicker();
$('#datepicker4').datepicker();
$('#datepicker5').datepicker();
$('#datepicker6').datepicker();
$('#datepicker7').datepicker();
$('#datepicker8').datepicker();
$('#datepicker9').datepicker();


function setLocalStorage() {
    var alarm = {
        'power': 'off',
        'toggle': 'off',
        'title': '',
        'memo': '',
        'date': '',
        'ampm': 'am',
        'hour': '',
        'min': '',
        'transBt':'show',
    };
    storage.set({ eye_alarm: alarm }); 
    storage.set({ alarm1: alarm });
    storage.set({ alarm2: alarm });
    storage.set({ alarm3: alarm });
    storage.set({ alarm4: alarm });
    storage.set({ alarm5: alarm });
    storage.set({ alarm6: alarm });
    storage.set({ alarm7: alarm });
    storage.set({ alarm8: alarm });
    storage.set({ alarm9: alarm });
}

function save(name,alarm) {
    if(name == 'alarm1') {storage.set({alarm1 : alarm});}
    else if (name =='alarm2') {storage.set({alarm2 : alarm});}
    else if (name =='alarm3') {storage.set({alarm3 : alarm});}
    else if (name =='alarm4') {storage.set({alarm4 : alarm});}
    else if (name =='alarm5') {storage.set({alarm5 : alarm});}
    else if (name =='alarm6') {storage.set({alarm6 : alarm});}
    else if (name =='alarm7') {storage.set({alarm7 : alarm});}
    else if (name =='alarm8') {storage.set({alarm8 : alarm});}
    else if (name =='alarm9') {storage.set({alarm9 : alarm});}   
}
function saveAll(name, alarm) {
    if(name == 'alarm1') {storage.set({alarm1 : alarm});}
    else if (name =='alarm2') {storage.set({alarm2 : alarm});}
    else if (name =='alarm3') {storage.set({alarm3 : alarm});}
    else if (name =='alarm4') {storage.set({alarm4 : alarm});}
    else if (name =='alarm5') {storage.set({alarm5 : alarm});}
    else if (name =='alarm6') {storage.set({alarm6 : alarm});}
    else if (name =='alarm7') {storage.set({alarm7 : alarm});}
    else if (name =='alarm8') {storage.set({alarm8 : alarm});}
    else if (name =='alarm9') {storage.set({alarm9 : alarm});}
    else if (name == 'eye_alarm') {storage.set({eye_alarm : alarm});}   
}


function initalizeEyeAlarm(){
    var alarm = {
        'power': 'on',
        'toggle': 'off',
        'title': '',
        'memo': '',
        'date': '',
        'ampm': 'am',
        'hour': '',
        'min': '',
        'transBt':'show',
    };
    storage.set({ eye_alarm: alarm });
}

function saveToggleAMEye(name,parent){
    var alarm = {
        'power': 'on',
        'toggle': 'on',
        'title': '',
        'memo': '',
        'date': '',
        'ampm': 'am',
        'hour': parent.querySelector('.hour').value,
        'min': parent.querySelector('.min').value,
        'transBt':'none'
    };
    storage.set({eye_alarm:alarm});    
}

function saveTogglePMEye(name,parent){
    var alarm = {
        'power': 'on',
        'toggle': 'on',
        'title': '',
        'memo': '',
        'date': '',
        'ampm': 'pm',
        'hour': parent.querySelector('.hour').value,
        'min': parent.querySelector('.min').value,
        'transBt':'none'
    };
    storage.set({eye_alarm:alarm});    
}

function saveToggleAM(name, parent){
    var alarm = {
        'power': 'on',
        'toggle': 'on',
        'title': parent.querySelector('.title').value,
        'memo': parent.querySelector('.memo').value,
        'date': parent.querySelector('.date').value,
        'ampm': 'am',
        'hour': parent.querySelector('.hour').value,
        'min': parent.querySelector('.min').value,
        'transBt':'none'
    };
    save(name,alarm); 
}

function saveTogglePM(name, parent){
    var alarm = {
        'power': 'on',
        'toggle': 'on',
        'title': parent.querySelector('.title').value,
        'memo': parent.querySelector('.memo').value,
        'date': parent.querySelector('.date').value,
        'ampm': 'pm',
        'hour': parent.querySelector('.hour').value,
        'min': parent.querySelector('.min').value,
        'transBt':'none'
    };
    save(name,alarm);
}

function removeToggleAMEye(name,parent){
    var alarm = {
        'power': 'on',
        'toggle': 'off',
        'title': '',
        'memo': '',
        'date': '',
        'ampm': 'am',
        'hour': parent.querySelector('.hour').value,
        'min': parent.querySelector('.min').value,
        'transBt':'show'
    };
    storage.set({eye_alarm:alarm});    
}

function removeTogglePMEye(name,parent){
    var alarm = {
        'power': 'on',
        'toggle': 'off',
        'title': '',
        'memo': '',
        'date': '',
        'ampm': 'pm',
        'hour': parent.querySelector('.hour').value,
        'min': parent.querySelector('.min').value,
        'transBt':'show'
    };
    storage.set({eye_alarm:alarm});  
}

function removeToggleAM(name, parent){
    var alarm = {
        'power': 'on',
        'toggle': 'off',
        'title': parent.querySelector('.title').value,
        'memo': parent.querySelector('.memo').value,
        'date': parent.querySelector('.date').value,
        'ampm': 'am',
        'hour': parent.querySelector('.hour').value,
        'min': parent.querySelector('.min').value,
        'transBt':'show'
    };
    save(name,alarm);
}

function removeTogglePM(name, parent){
    var alarm = {
        'power': 'on',
        'toggle': 'off',
        'title': parent.querySelector('.title').value,
        'memo': parent.querySelector('.memo').value,
        'date': parent.querySelector('.date').value,
        'ampm': 'pm',
        'hour': parent.querySelector('.hour').value,
        'min': parent.querySelector('.min').value,
        'transBt':'show'
    };
    save(name,alarm);
}

function savePower(name){
    var alarm = {
        'power': 'on',
        'toggle': 'off',
        'title': '',
        'memo': '',
        'date': '',
        'ampm': 'am',
        'hour': '',
        'min': '',
        'transBt':'show'
    };
    saveAll(name,alarm);  
}

function removePower(name) {
    var alarm = {
        'power': 'off',
        'toggle': 'off',
        'title': '',
        'memo': '',
        'date': '',
        'ampm': 'am',
        'hour': '',
        'min': '',
        'transBt':'show'
    };
    saveAll(name,alarm);
}


/* Main */
chrome.storage.local.get('flag', function(data) {

    if (typeof data.flag === 'undefined') {
        setLocalStorage();
        initalizeEyeAlarm();
        storage.set({'flag':1}); 
    }
    else{
        $('.schedule-alarm').find('input, button, textarea').prop('disabled',true);
    $(function () {
        var self = this;

        chrome.storage.local.get(null, function (items) {
            alarm_val = items.eye_alarm;  
            alarm_val1 = items.alarm1;
            alarm_val2 = items.alarm2;
            alarm_val3 = items.alarm3;
            alarm_val4 = items.alarm4;
            alarm_val5 = items.alarm5;
            alarm_val6 = items.alarm6;
            alarm_val7 = items.alarm7;
            alarm_val8 = items.alarm8;
            alarm_val9 = items.alarm9;
            
    
            if(alarm_val.hour != "") self.querySelector('#eye_alarm').querySelector('.hour').value = alarm_val.hour;
            if(alarm_val.min != "") self.querySelector('#eye_alarm').querySelector('.min').value = alarm_val.min;

            if (alarm_val.ampm == 'am') {
                $("#am0").prop("checked", true);
            } else {
                $("#pm0").prop("checked", true);
            }

            if(alarm_val.toggle == 'on') { 
                $('#toggle0').prop("checked", true); 
                switches[0].classList.add('active');
                $('#eye_alarm').find('input').prop('disabled',true);
                $('#toggle0').prop('disabled',false);
                $('#transBtn0').prop('disabled',false);
            }
            else {
                $('#toggle0').prop("checked", false);
                switches[0].classList.remove('active');
                $('#eye_alarm').find('input').prop('disabled',false);
                $('#toggle0').prop('disabled',true);
                $('#transBtn0').prop('disabled',false);
                
            }
            if(alarm_val.transBt == 'show'){
                self.querySelector('#transBtn0').style.display = 'block';
                transbtn[0].classList.add('active');
            } else {
                self.querySelector('#transBtn0').style.display = 'none';
                transbtn[0].classList.remove('active');
            }

            for (var i = 1; i < 10; i++) {
                if(window['alarm_val'+i].title != "")self.querySelector('#alarm'+i).querySelector('.title').value = window['alarm_val'+i].title;
                if(window['alarm_val'+i].memo != "")self.querySelector('#alarm' + i).querySelector('.memo').value = window['alarm_val'+i].memo;
                if(window['alarm_val'+i].date != "")self.querySelector('#alarm' + i).querySelector('.date').value = window['alarm_val'+i].date;
                if(window['alarm_val'+i].hour != "")self.querySelector('#alarm' + i).querySelector('.hour').value = window['alarm_val'+i].hour;
                if(window['alarm_val'+i].min != "")self.querySelector('#alarm' + i).querySelector('.min').value = window['alarm_val'+i].min;

                if (window['alarm_val'+i].ampm == 'am') { 
                    $("#am" + i).prop("checked", true); 
                } else { 
                    $("#pm" + i).prop("checked", true);
                }
                if(window['alarm_val'+i].power == 'on'){
                    $(self.querySelector('#alarm'+i).querySelector('#power'+i)).css('background','url(img/powerbt_on.png)'); 
                    $(self.querySelector('#_wrap'+i)).css('background-color','transparent');
                    $('#alarm'+i).find('input, button, textarea').prop('disabled',false);
                    power[i-1].classList.add('active');
                    $('#power'+i).prop('disabled',false);

                    if(window['alarm_val'+i].toggle == 'on') { 
                        $('#toggle'+i).prop("checked", true); 
                        $('#alarm'+i).find('input, button, textarea').prop('disabled',true);
                        $('#toggle'+i).prop('disabled',false);
                        switches[i].classList.add('active');
                        $('#note'+i).prop('disabled',false);
                        $('#power'+i).prop('disabled',false);
                        $('#transBtn'+i).prop('disabled',false);
                    }
                    else { 
                        $('#toggle'+i).prop("checked", false);
                        switches[i].classList.remove('active');
                        $('#alarm'+i).find('input, button, textarea').prop('disabled',false);
                        $('#toggle'+i).prop('disabled',true);
                        $('#note'+i).prop('disabled',false);
                        $('#transBtn'+i).prop('disabled',false);
                    }

                    if(window['alarm_val'+i].toggle == 'on') { 
                        $('#toggle'+i).prop("checked", true); 
                        $('#alarm'+i).find('input, button, textarea').prop('disabled',true);
                        $('#toggle'+i).prop('disabled',false);
                        switches[i].classList.add('active');
                        $('#note'+i).prop('disabled',false);
                        $('#power'+i).prop('disabled',false);
                        $('#transBtn'+i).prop('disabled',false);
                    }
                    else { 
                        $('#toggle'+i).prop("checked", false);
                        switches[i].classList.remove('active');
                        $('#alarm'+i).find('input, button, textarea').prop('disabled',false);
                        $('#toggle'+i).prop('disabled',true);
                        $('#note'+i).prop('disabled',false);
                        $('#transBtn'+i).prop('disabled',false);
                    }
    
                    if(window['alarm_val'+i].memo != ''){
                        $(self.querySelector('#alarm'+i).querySelector('#note'+i)).css({
                            'background':'url(img/note_on.png)',
                            'background-repeat':'no-repeat',
                            'background-size': 'contain'
                        });
                     } else {
                        $(self.querySelector('#alarm'+i).querySelector('#note'+i)).css({
                            'background':'url(img/note_16.png)',
                            'background-repeat':'no-repeat',
                            'background-size': 'contain'
                        });
                     }
    
                     if(window['alarm_val'+i].transBt == 'show'){
                        self.querySelector('#transBtn'+i).style.display = 'block';
                        transbtn[i].classList.add('active');
                    } else {
                        self.querySelector('#transBtn'+i).style.display = 'none';
                        transbtn[i].classList.remove('active');
                    }
                } else {
                    $(self.querySelector('#alarm'+i).querySelector('#power'+i)).css('background','url(img/powerbt_off.png)'); 
                    $(self.querySelector('#_wrap'+i)).css('background-color','rgba(114, 114, 114, 0.342)');
                    $('#alarm'+i).find('input, button, textarea').prop('disabled',true);
                    power[i-1].classList.remove('active');
                    $('#note'+i).prop('disabled',true);
                    $('#power'+i).prop('disabled',false);
                }
                
                
            }
        });
    });
    }
  });


$('.schedule-alarm').find('input, button, textarea').prop('disabled',true);
$('.powerBtn').prop('disabled',false);
$('.checkbox').prop('disabled',true);

for(var i =0; i < power.length; i++){
    power[i].addEventListener('click', function(event){
        let parent = this.parentNode.parentNode;
        let alarm_id = document.getElementById(parent.getAttribute('id')).getAttribute('id');
        let number = alarm_id.substring(5, 6);
        let check_tog;
        let check_id;

        var name = $(parent).attr('id');

        if(this.classList.contains('active')){
            
            this.classList.remove('active');

            parent.querySelector('.title').value ="";
            parent.querySelector('.date').value ="";
            parent.querySelector('.hour').value ="";
            parent.querySelector('.min').value ="";
            parent.querySelector('.memo').value ="";
            $("#am"+number).prop("checked", true);
            $(parent.querySelector('.noteBtn')).css({
                'background':'url(img/note_16.png)',
                'background-repeat':'no-repeat',
                'background-size': 'contain'}); 

            if(parent.querySelector('.checkbox').classList.contains('active'))
            $('#toggle'+number).trigger('click');

            $('#'+alarm_id).find('input, button, textarea').prop('disabled',true);
            $('#power'+number).prop('disabled',false);

            $(parent.querySelector('.memo_area')).css('display','none');

            $(parent.querySelector('.powerBtn')).css('background','url(img/powerbt_off.png)'); 
            $(parent.parentNode).css('background-color','rgba(114, 114, 114, 0.342)');
                
            removePower(name);

        }else{
            this.classList.add('active');
            check_tog = parent.querySelector('.checkbox');
            check_id =document.getElementById(check_tog.getAttribute('id')).getAttribute('id');

            $('#'+alarm_id).find('input, button, textarea').prop('disabled',false);
            $('#'+check_id).prop('disabled',true);

            $(parent.querySelector('.memo_area')).css('display','block');

            $(parent.querySelector('.powerBtn')).css('background','url(img/powerbt_on.png)'); 
            $(parent.parentNode).css('background-color','transparent');
        
            savePower(name);
        }
    })
}


for(var i = 0; i < transbtn.length; i++){
    transbtn[i].addEventListener('click', function(event){
        let transbtn_id = document.getElementById(this.getAttribute('id')).getAttribute('id');
        let parent = this.parentNode.parentNode.parentNode.parentNode;
        let number = transbtn_id.substring(8, 9);
        let amCheck = $('#am'+number).is(":checked");
        
        var name = $(parent).attr('id');

        let check  = checkInput(transbtn_id, parent, amCheck);

        if(check){
            if(addTime >= 0){
                this.style.display = 'none';
                $('#toggle'+number).prop('disabled',false);
                $('#toggle'+number).trigger('click');
                
                $(parent.querySelector('.memo_area')).css('display','none');

                if(number == 0){
                    if(amCheck == true){ saveToggleAMEye(name,parent); } 
                    else { saveTogglePMEye(name,parent); }
                } else {
                    if(amCheck == true) { saveToggleAM(name,parent); } 
                    else { saveTogglePM(name,parent); }
                }

            }
            else{
                alert('이 알람은 평생 울리지 않아요!');
            }
        }
        else{
            alert('입력을 안 한 칸이 있어요!');
        }
    })
}


for(var i = 0; i < switches.length; i++){
    switches[i].addEventListener('click', function(event){
        let toggle_id = document.getElementById(this.getAttribute('id')).getAttribute('id');
        let parent = this.parentNode.parentNode.parentNode.parentNode; 
        let transOn = parent.querySelector('.togBtn');
        let num;
        let amCheck;

        var name = $(parent).attr('id');

        if(this.classList.contains('active')){
            this.classList.remove('active');
            clearAlarm(toggle_id);
            
            if(toggle_id =='toggle0'){
                $('.eye-alarm').find('input, button, textarea').prop('disabled',false);
                amCheck=$('#am0').is(":checked");
                if(amCheck == true){ removeToggleAMEye(name,parent); } 
                else { removeTogglePMEye(name,parent); }
            }else{
                num = toggle_id.substring(6,7);
                amCheck=$('#am'+num).is(":checked");
                $('#alarm'+num).find('input, button, textarea').prop('disabled',false);

                if(amCheck == true) { removeToggleAM(name,parent); } 
                else { removeTogglePM(name,parent); }
            }
            $('#'+toggle_id).prop('disabled',true);
            transOn.style.display = 'block';

            
        
        }else{
            this.classList.add('active');
            if(toggle_id == 'toggle0'){
                $('.eye-alarm').find('input, button, textarea').prop('disabled',true);
             
            }else{
                alarm_id = document.getElementById(parent.getAttribute('id')).getAttribute('id');
                num = alarm_id.substring(5,6);
                $('#'+alarm_id).find('input, button, textarea').prop('disabled',true);
                $('#power'+num).prop('disabled',false);
                $('#note'+num).prop('disabled',false);
    
                if(parent.querySelector('.memo').value =="")
                {
                    $('#note'+num).css({
                        'background':'url(img/note_16.png)',
                        'background-repeat':'no-repeat',
                        'background-size': 'contain'
                    });
                }

            }
            $('#'+toggle_id).prop('disabled',false);
            createAlarm(toggle_id, addTime);

        }
    })
}


