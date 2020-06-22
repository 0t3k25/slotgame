'use strict';

(function(){
    let score = 0; //得点
    let level = 1; //レベル
    let interval = 400; //スロットの速度
    let timers = []; //スロット
    let results = []; //スロットを止めた時の値
    let stopCount = [0,0,0]; //スロットを止めたか判別

    //左の値を止める
    document.getElementById('stop0').onclick = function() {
        stopSlot(0);
    }    
    //真ん中の値を止める
    document.getElementById('stop1').onclick = function() {
        stopSlot(1);
    }
    //右の値を止める
    document.getElementById('stop2').onclick = function() {
        stopSlot(2);
    }

    startSlot();

    function startSlot() {

        //初期化(からの状態へ？
        stopCount = [0,0,0];//
        timers = [];
        results = [];

        document.getElementById('num0').textContent = 7;
        document.getElementById('num1').textContent = 7;
        document.getElementById('num2').textContent = 7;

        //run slot
        runSlot(0);
        runSlot(1);
        runSlot(2);
    }
    
    function runSlot(num){

        let slotValue =document.getElementById('num' + num);

        if(slotValue.textContent < 9){
            slotValue.textContent ++;
        } else {
            slotValue.textContent = 0;
        }

        timers[num] = setTimeout(function(){

            runSlot(num);
        },interval);
    }

    function stopSlot(num) {

        clearTimeout(timers[num]);

        results[num] = document.getElementById('num' + num).textContent;

        stopCount[num] = 1;

        if (stopCount[0]*stopCount[1]*stopCount[2] === 1){
            checkResult();
        }
    }
        function checkResult() {

            if(results[0] === results[1] && results[0] === results[2]) {

                score += 100;
                level += 1;
                interval *= 0.8;

                getScore();

                startSlot();
            } else {
                gameover();
            }
        }

        function getScore() {
            document.getElementById('score').textContent = score;
            document.getElementById('level').textContent = level;
        }

        function gameover() {
            alert('ゲームオーバーwww');
        }

        document.getElementById('reset').onclick = function() {
            //スロット全部止め
            clearTimeout(timers[0]);
            clearTimeout(timers[1]);
            clearTimeout(timers[2]);

        //初期化
        document.getElementById('score').textContent = 0;
        document.getElementById('level').textContent = 1; 
        score = 0; //得点
        level = 1; //レベル
        interval = 400; //スロットの速度
        timers = []; //スロット
        results = []; //スロットを止めた時の値
        stopCount = [0,0,0]; //スロットを止めたか判別

        startSlot();
        }
})();


