$(function(){
    
    var arySpinnerCtrl = [];
    var spin_speed = 20; //変動スピード

    var aryHistory =[];
    var aryCount=0;

    var history0 = document.getElementById("history0");
    var history1 = document.getElementById("history1");
    var history2 = document.getElementById("history2");

    var history0Array =[];
    var history1Array =[];
    var history2Array =[];
    
    //長押し押下時
    $('.btnspinner').on('touchstart mousedown click', function(e){
        if(arySpinnerCtrl['interval']) return false;
        var target = $(this).data('target');
        arySpinnerCtrl['target'] = target;
        arySpinnerCtrl['timestamp'] = e.timeStamp;
        arySpinnerCtrl['cal'] = Number($(this).data('cal'));
        //クリックは単一の処理に留める
        if(e.type == 'click'){
            spinnerCal();
            arySpinnerCtrl = [];
            return false;
        }
        //長押し時の処理
        setTimeout(function(){
            //インターバル未実行中 + 長押しのイベントタイプスタンプ一致時に計算処理
            if(!arySpinnerCtrl['interval'] && arySpinnerCtrl['timestamp'] == e.timeStamp){
                arySpinnerCtrl['interval'] = setInterval(spinnerCal, spin_speed);
            }
        }, 500);
    });
    
    //長押し解除時 画面スクロールも解除に含む
    $(document).on('touchend mouseup scroll', function(e){
        if(arySpinnerCtrl['interval']){
            clearInterval(arySpinnerCtrl['interval']);
            arySpinnerCtrl = [];
        }
    });
    
    //変動計算関数
    function spinnerCal(){
        var target = $(arySpinnerCtrl['target']);
        var num = Number(target.val());
        num = num + arySpinnerCtrl['cal'];
        if(num > Number(target.data('max'))){
            target.val(Number(target.data('max')));
        }else if(Number(target.data('min')) > num){
            target.val(Number(target.data('min')));
        }else{
            target.val(num);
        }
    }

    const ary = [
        3.0,
        3.5,
        4.0,
        4.5,
        5.0,
        5.5,
        6.0,
        6.5,
        7.0,
    ];

    $('.calculate').on('click', function(e){
        
        var cal=0;
        var numberAry =[];
        
        for(let i=0;i < 9;i++){
            let number = document.getElementById("number"+(i+1)).value;
            cal += ary[i] * number;
            numberAry.push(number);
        }
        // 計算結果表示
        var doc0 = document.getElementById("result");
        doc0.innerHTML=cal+"%";

        // 履歴表示
        console.log(aryCount);
        if(aryCount==0){
            history0Array = numberAry.concat();
            history0.innerHTML=history0Array;
        }else if(aryCount==1){
            history1Array = numberAry.concat();
            history1.innerHTML=history1Array;
        }else if(aryCount==2){
            history2Array = numberAry.concat();
            history2.innerHTML=history2Array;
        }else if(aryCount > 2){
            history0Array=history1Array.concat();
            history1Array=history2Array.concat();
            history2Array=numberAry.concat();

            history0.innerHTML=history0Array;
            history1.innerHTML=history1Array;
            history2.innerHTML=history2Array;
        }
        aryCount =aryCount+1;
        
        


        
    });
});
