const scriptName = "RockPaperScissors.js";

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
  if (msg.startsWith("!가위바위보")) {
    /*
     * args[0] = "!가위바위보"
     * args[1]는 "가위", "바위", "보" 중 하나
     */
    let args = msg.split(' ');
    let userSelection = null;
    let resultChat = "";
    switch (args[1]) {
      case "가위":
        userSelection = 0;
        break;
      case "바위":
        userSelection = 1;
        break;
      case "보":
        userSelection = 2;
        break;
    }
    if (userSelection == null) {
      replier.reply("잘못 입력하셨어요.");
      return;
    }

    let botSelection = Math.floor(Math.random() * 3);
    let botSelectionString = null;

    switch (botSelection) {
      case 0:
        botSelectionString = "가위";
        break;
      case 1:
        botSelectionString = "바위";
        break;
      case 2:
        botSelectionString = "보";
        break;
    }
    resultChat += "저는 " + botSelectionString + "를 냈어요.\n";
    /*
     * userSelection == botSelection: 비겼을 때
     * 가위: 0, 바위: 1, 보: 2
     * 바위 > 가위, 보 > 바위, 가위 > 보
     * 1 (= 2 % 3) > 0, 2 (= 2 % 3) > 1, 0 (= 3 % 3) > 2
     */
    if (userSelection == botSelection) { // 비겼을 때
      resultChat += "비겼어요.";
    } else if ((botSelection + 1) % 3 > userSelection) { // 봇이 이겼을 때
      resultChat += "제가 이겼어요.";
    } else { // 유저가 이겼을 때
      resultChat += "당신이 이겼어요!";
    }

    replier.reply(resultChat);
  }
}
