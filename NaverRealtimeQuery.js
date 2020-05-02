importPackage(org.jsoup)

function response(room, msg, sender, isGroupChat, replier) {
  if (msg.trim() == "!실시간검색어") {
    var url = "https://datalab.naver.com/keyword/realtimeList.naver?entertainment=2&groupingLevel=0&marketing=2&news=2&sports=2";
    var document = null;
    try {
      document = Jsoup.connect(url).userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36").get();
    } catch (error) {
      replier.reply("뭔가 문제가 발생했습니다.\n" + error);
    }
    var rankListHTML = document.select("li.ranking_item span.item_title").toString().split("<span class=\"item_title\">");
    var rankList = "";
    for (var i = 1; i < rankListHTML.length; i++) {
      rankList += i + ". " + rankListHTML[i].replace("\n", "").replace("</span>", "") + "\n"
    }
    replier.reply(rankList);
  }
}
