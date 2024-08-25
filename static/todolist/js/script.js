window.addEventListener("load" , function (){ 
    let today   = new Date();

    let year    = String(today.getFullYear());
    let month   = ("0" + String(today.getMonth() + 1) ).slice(-2);
    let day     = ("0" + String(today.getDate()) ).slice(-2);

    let date    = year + "-" + month + "-" + day;

    let config_date = { 
        locale: "ja",
        dateFormat: "Y-m-d",
        defaultDate: date,
    }

    flatpickr("[name='deadline']", config_date);


    const calendar_elem = document.getElementById('calendar');
    const config        = {}

    config.initialView  = 'dayGridMonth';

    // 日本語化、来月と先月のデータは非表示
    config.locale       = "local";
    config.showNonCurrentDates  = false;


    config.events       = todo_url;
    config.eventClick   = (info) => {
        console.log('Event: ' + info.event.id);
        const target = document.getElementById("todo_" + info.event.id );
        if (target){
            target.scrollIntoView({  
                behavior: 'smooth',
            });
        }
    }


    const calendar      = new FullCalendar.Calendar(calendar_elem, config);
    calendar.render();

});
