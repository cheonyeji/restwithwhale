chrome.alarms.onAlarm.addListener(function(alarm) {
    var i = alarm.name;
    if(i == 'toggle0'){
        notification_eye();

        whale.runtime.sendMessage({
            msg: "alarm create", 
            data: {
                content: i
            }
        });
    }
    else{
        notification_schedule();

        whale.runtime.sendMessage({
            msg: "toggle off", 
            data: {
                content: i
            }
        });
    }
});

function notification_eye(){
    var myNotificationID = null;


    whale.notifications.create("", {
        type:    "basic",
        iconUrl: "img/upa.gif",
        title:   "눈 운동하러 갈까요?",
        message: "웨일로 돌아가보세요",
        contextMessage: "고백이가 기다리고 있어요!",
        buttons: [
            {title: "YES"},
            {title: "NO"}
        ]
    }, function(id) {
        myNotificationID = id;
    });

    whale.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
        if (notifId === myNotificationID) {
            if (btnIdx === 0) {
                window.open("eyealert.html");
            }
            else if(btnIdx===1){
                whale.notifications.clear(notifId);
            }
        }
    });
}


function notification_schedule(){
    whale.notifications.create("", {
        type:"basic",
        iconUrl:"img/upa.gif",
        title:"일정이 완료되었어요",
        message:"웨일로 돌아가보세요",
        contextMessage:"완료된 일정을 확인해보세요!",
    });
    
}
