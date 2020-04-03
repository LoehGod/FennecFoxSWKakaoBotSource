function response(room, msg, sender, isGroupChat, replier) {

  const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"

  // 팩토리얼
  var number;
  var factorialHTML = org.jsoup.Jsoup.connect("https://ko.numberempire.com/factorialcalculator.php?number=" + number).userAgent(USER_AGENT).get();
  var factorialResult = String(factorialHTML.select("span#result1")).replace(/(<([^>]+)>)/ig, "");

  // 소인수분해
  var number;
  var factorizerHTML =  org.jsoup.Jsoup.connect("https://ko.numberempire.com/numberfactorizer.php?number=" + number).userAgent(USER_AGENT).get();
  var factorizerResult = String(factorizerHTML.select("span#result1")).replace(/(<([^>]+)>)/ig, "");

  // 소수
  // UNFINISHED
  const ACTION_MAP = new Map();
  ACTION_MAP.set("검사", "check")
  ACTION_MAP.set("다음소수", "next")
  ACTION_MAP.set("이전소수", "prev")
  var number; // 검사할 숫자
  var action; // 소수 검사 동작
  var primeNumbersHTML =  org.jsoup.Jsoup.connect("https://ko.numberempire.com/primenumbers.php?number=" + number + "&action=" + ACTION_MAP.get(action)).userAgent(USER_AGENT).get();
  var primeNumbersResult;
  if (ACTION_MAP.get(action) == "check") {
    primeNumbersResult = String(primeNumbersHTML).split("</a>")[5].split("</div>")[0].replace(/(<([^>]+)>)/ig, "").trim();
  } else {
    primeNumbersResult = String(primeNumbersHTML).split("<br>")[2].split("</a>")[0].replace(/(<([^>]+)>)/ig, "").replace("       ", "").trim();
  }
}
