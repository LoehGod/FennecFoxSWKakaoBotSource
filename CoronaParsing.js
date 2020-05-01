const CORONA_REGION_MAP = {
  "서울": 7,
  "부산": 8,
  "대구": 9,
  "인천": 10,
  "광주": 11,
  "대전": 12,
  "울산": 13,
  "세종": 14,
  "경기": 15,
  "강원": 16,
  "충북": 17,
  "충남": 18,
  "전북": 19,
  "전남": 20,
  "경북": 21,
  "경남": 22,
  "제주": 23,
  "검역": 24,
};

const CORONA_REGIONS = ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주", "검역"];

function response(room, msg, sender, isGroupChat, replier) {

  if (msg.startsWith("!코로나") == true) {

    var args = msg.split(" ");
    var doc = org.jsoup.Jsoup.connect("http://ncov.mohw.go.kr/").userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36").get()
    var livedate = String(doc.select("span.livedate")).split("\n")[0].replace(/(<([^>]+)>)/ig, ""); // 기준 날짜

    if (args.length == 1) { // '!코로나'만 입력된 경우
      var numbers = String(doc.select("span.num")).split("\n");
      var confirmed = numbers[0].replace(/(<([^>]+)>)/ig, "") + "명";// 확진환자
      var recovered = numbers[1].replace(/(<([^>]+)>)/ig, "") + "명"; // 완치
      var quarantined = numbers[2].replace(/(<([^>]+)>)/ig, "") + "명"; // 치료중
      var deceased = numbers[3].replace(/(<([^>]+)>)/ig, "") + "명"; // 사망
      var testsPerformed = numbers[4].replace(/(<([^>]+)>)/ig, ""); // 누적 검사수
      var testsConcluded = numbers[5].replace(/(<([^>]+)>)/ig, ""); // 누적 검사완료수

      var number = String(doc.select("span.data1"));
      var dailyConfirmed = number.replace(/(<([^>]+)>)/ig, "") + "명"; // 일일 확진자

      number = String(doc.select("span.data2"));
      var dailyRecovered = number.replace(/(<([^>]+)>)/ig, "") + "명"; // 일일 완치자

      numbers = String(doc.select("span.before")).split("\n");
      var confirmedDailyChange = numbers[0].replace(/(<([^>]+)>)/ig, "").replace("전일대비", ""); // 확진환자 전일대비
      var recoveredDailyChange = numbers[1].replace(/(<([^>]+)>)/ig, "").replace("전일대비", ""); // 완치 전일대비
      var quarantinedDailyChange = numbers[2].replace(/(<([^>]+)>)/ig, "").replace("전일대비", ""); // 치료중 전일대비
      var deceasedDailyChange = numbers[3].replace(/(<([^>]+)>)/ig, "").replace("전일대비", "") // 사망 전일대비

      // TODO 출력문은 직접 구현할 것. 혹은 이미 구현된 출력문을 여기에 붙여넣기 할것.
      // 기준 날짜를 전달하기 위해 문자열 livedate를 포함해도 좋음

      replier.reply(confirmed + " " + recovered + " " + quarantined + " " + deceased + " " + dailyConfirmed + " " + dailyRecovered + " " + confirmedDailyChange + " " + recoveredDailyChange + " " + quarantinedDailyChange + " " + deceasedDailyChange)

    } else if (args.length == 2 && args[1] == "지역") { // '!코로나 도움말'만 입력된 경우

      // TODO 출력문은 직접 구현할 것. 혹은 이미 구현된 출력문을 여기에 붙여넣기 할것.
      // TODO 아래는 예시 출력문. 예시 출력문을 수정/유지해도 좋음.

      replier.reply("현재 사용가능한 코로나 지역은 다음과 같습니다.\n" +
                    "서울\t대구\t광주\n" +
                    "부산\t인천\t대전\n" +
                    "울산\t경기\t충북\n" +
                    "세종\t강원\t충남\n" +
                    "전북\t경북\t제주\n" +
                    "전남\t경남\t검역");

    } else if (args.length == 3 && args[1] == "지역") { // '!코로나 지역 <지역>'이 입력된 경우

      var region = args[2];
      if (CORONA_REGIONS.indexOf(args[2]) > -1) {
        var regionNumbers = String(doc.select("span.num")).split("\n");
        var regionConfirmed = regionNumbers[CORONA_REGION_MAP[region]].replace(/(<([^>]+)>)/ig, "") + "명"; // 특정 지역 확진환자

        // TODO 출력문은 직접 구현할 것. 혹은 이미 구현된 출력문을 여기에 붙여넣기 할것. 기준 날짜를 전달하기 위해 문자열 livedate를 포함해도 좋음

        replier.reply(regionConfirmed)

      } else {

        // TODO 오류 출력문은 직접 구현할 것. 혹은 이미 구현된 출력문을 여기에 붙여넣기 할것.
        // TODO 아래는 예시 출력문. 예시 출력문을 수정/유지해도 좋음.

        replier.reply("없는 지역입니다. 지역을 확인해 주세요.")
        replier.reply("현재 사용가능한 코로나 지역은 다음과 같습니다.\n" +
                      "서울\t대구\t광주\n" +
                      "부산\t인천\t대전\n" +
                      "울산\t경기\t충북\n" +
                      "세종\t강원\t충남\n" +
                      "전북\t경북\t제주\n" +
                      "전남\t경남\t검역");
      }

    } else { // '!코로나'로 시작하는데 올바르지 않은 명령어 일 경우

      // TODO 오류 출력문은 직접 구현할 것. 혹은 이미 구현된 출력문을 여기에 붙여넣기 할것.
      // TODO 아래는 예시 출력문. 예시 출력문을 수정/유지해도 좋음.

      replier.reply("올바르지 않은 명령입니다. !코로나 명령의 사용방법은 아래와 같습니다.")
      replier.reply("!코로나\n!코로나 지역 [지역]")

    }

  }

}
