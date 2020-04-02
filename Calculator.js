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
}
