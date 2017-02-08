
function searchTweets(){
	var keyword = document.getElementById("keywordTextbox").value;
  window.location.href='searchResult.html?searchstring='+keyword;

}
function loadresults(){

	if (window.location.search.split('?').length > 1) {
	                var params = window.location.search.split('?')[1];
	                var keyword = decodeURIComponent(params.split('=')[1]);
									//alert(keyword);
								}
var keyword1 = localStorage.getItem("sstring");
//alert(keyword1);
	$.getJSON("http://thunderx.cise.ufl.edu:8080/api/s/".concat(keyword) , showResults);
}
function showResults(response){
  var results = response.results;
  /*var keyword = document.getElementById("keywordTextbox").value;
  results = results.filter(function (item) {
              return (item.title).indexOf(keyword) >= 0 | (item.text).indexOf(keyword) >= 0 |
              (item.date).indexOf(keyword) >= 0;
            });*/
  var rows = results.map(function(item){
    return (createRow(item.title, item.image, item.date, item.id, item.text));
  });
  document.getElementById("apiList").innerHTML = "<button onclick='goBack()'>Back</button><br /><table id='resultsTable'></table>";
  rows.forEach(function(row){

    document.getElementById("resultsTable").appendChild(row);
  });

	$("#resultsTable").on('click','radio',function(e) {
    //alert($(this).attr('id'));
		//alert($(this).attr('desc'));
		//alert( $('img').prop('src') );
		//alert( $('img')[0].src );
		//alert($(this).text());

		//window.location.href = 'searchResult.html';
	});

  //document.getElementById("searchForm").style.display = "none";
  //document.getElementById("apiList").style.display = "block";
}

function showSearchForm() {
  document.getElementById("searchForm").style.display = "block";
  document.getElementById("apiList").style.display = "none";
}

function createRow(user, iconUrl, tweet, id, description){
  var tweetRow = document.createElement("tr");
  var iconCell = document.createElement("td");
  iconCell.setAttribute("class", "icon");
  var icon = document.createElement("img");
  icon.src = iconUrl;
  icon.setAttribute("alt", user);
  icon.setAttribute("height", 48);
  icon.setAttribute("width", 48);
  iconCell.appendChild(icon);
  tweetRow.appendChild(iconCell);
  var tweetCell = document.createElement("td");
  tweetCell.setAttribute("class", "tweet");
  tweetCell.appendChild(document.createTextNode(user + ": " + tweet));
	//tweetRow.setAttribute("desc", description);
  tweetRow.appendChild(tweetCell);

  var iconCell1 = document.createElement("td");

  var radio1 = document.createElement("input");
  radio1.setAttribute("type","radio");
  radio1.setAttribute("name", "radSize"+id);
  radio1.setAttribute("id","1");
  radio1.setAttribute("value","read");
  radio1.setAttribute("onchange","myfunction(this)");
  radio1.setAttribute("ele", id);

  var radio2 = document.createElement("input");
  radio2.setAttribute("type","radio");
  radio2.setAttribute("name", "radSize"+id);
  radio2.setAttribute("id","2");
  radio2.setAttribute("value","Unread");
  radio2.setAttribute("onchange","myfunction(this)");
  radio2.setAttribute("ele", id);

  var radio3 = document.createElement("input");
  radio3.setAttribute("type","radio");
  radio3.setAttribute("name", "radSize"+id);
  radio3.setAttribute("id","3");
  radio3.setAttribute("value","Wishlist");
  radio3.setAttribute("onchange","myfunction(this)");
  radio3.setAttribute("ele", id);

  var default_check = localStorage.getItem(id);
  if(default_check == 1){
    radio1.setAttribute("checked","true");
  } else if (default_check == 2) {
        radio2.setAttribute("checked","true");
    } else if (default_check == 3){
        radio3.setAttribute("checked","true");
    } else {
      radio2.setAttribute("checked","true");
    }


    iconCell1.appendChild(radio1);
    iconCell1.append(document.createTextNode("Read"));
    iconCell1.appendChild(radio2);
    iconCell1.append(document.createTextNode("Unread"));
    iconCell1.appendChild(radio3);
    iconCell1.appendChild(document.createTextNode("Wishlist"));
    tweetRow.appendChild(iconCell1);
  return tweetRow;
}

function myfunction(this1) {
//alert($(this1).attr('ele'));
//alert($(this1).attr('id'));
localStorage.setItem($(this1).attr('ele'), $(this1).attr('id'));
alert(localStorage.getItem($(this1).attr('ele')));
}

function goBack() {
    window.history.back()
}
