/*********Sticky navbar***********/
let navbar = $(".navbar");
$(window).scroll(function () {
  // get the complete hight of window
  let oTop = $(".section-1").offset().top - window.innerHeight;
  if ($(window).scrollTop() > oTop) {
    navbar.addClass("sticky");
  } else {
    navbar.removeClass("sticky");
  }
});
/*********End Of Sticky navbar***********/
$("#reserve").on('click', function(){
  window.location.href = "index.html#reservation";
});

//********To hide the collapse navbar after a link is clicked********/
$('.navbar-nav>li>a').on('click', function(){
  $('.navbar-collapse').collapse('hide');
});

/*********Login & Register form************/
$(function() {

  $("#loginEmail").focus(function() {
    $("#invalid").attr("hidden", "hidden");
    $("#loggedin").attr("hidden", "hidden");
    $("#logSuccess").attr("hidden", "hidden");
  });
  $("#registerUser").focus(function() {
    $("#userExists").attr("hidden", "hidden");
    $("#mismatch").attr("hidden", "hidden");
    $("#registered").attr("hidden", "hidden");
    $("#register").removeAttr("disabled");
  });
  $("#registerUser").blur(function() {
    let username = $("#registerUser").val();
    if(localStorage.getItem(username) != undefined) {
      $("#userExists").removeAttr("hidden");
      $("#register").attr("disabled", "disabled");
    }
  });
  $("#login").click(function(event) {
    event.preventDefault();
    $("#loggedin").attr("hidden", "hidden");
    $("#logSuccess").attr("hidden", "hidden");
    $("#invalid").attr("hidden", "hidden");
    let username = $("#loginUser").val();
    let pass = $("#loginPass").val();
    if(localStorage.getItem(username) == pass) {
      $("#loggedin").removeAttr("hidden");
      localStorage.setItem("customer", username);
      $("#logSuccess").empty();
      $("#logSuccess").append(document.createTextNode("Welcome back, "+ username));
      setTimeout(function(){
        $("#loggedin").attr("hidden", "hidden");	
        $("#logSuccess").removeAttr("hidden");
          },500);
      setTimeout(function() {
       window.location.href = "index.html#reservation";
      }, 1500);
      document.getElementById("custName").innerText = username;
      document.getElementById("custNum").innerText = Math.floor(Math.random() * 1000000);
    } else {
      $("#invalid").removeAttr("hidden");
    }
    $("#loginPass").val('');
  });
  $("#register").click(function(event) {
    event.preventDefault();
    $("#userExists").attr("hidden", "hidden");
    $("#mismatch").attr("hidden", "hidden");
    $("#registered").attr("hidden", "hidden");
    let username = $("#registerUser").val();
    let pass = $("#registerPass").val();
    let repeat = $("#registerRepeat").val();
    if(localStorage.getItem(username) != undefined) {
      $("#userExists").removeAttr("hidden");
    } else {
      if(pass != repeat) {
        $("#mismatch").removeAttr("hidden");
      } else {
        localStorage.setItem(username, pass);
        $("#registered").removeAttr("hidden");
      }
    }
    $("#registerUser").val('');
    $("#registerPass").val('');
    $("#registerRepeat").val('');
  });
});

/*********End of Login & Register form************/

/*********Login & Register tab**********/
$(".login").hide();
      $(".register_li").addClass("active");

      $(".login_li").click(function(){
        $(this).addClass("active");
        $(".register_li").removeClass("active");
        $(".login").show();
        $(".register").hide();
      })

      $(".register_li").click(function(){
        $(this).addClass("active");
        $(".login_li").removeClass("active");
        $(".register").show();
        $(".login").hide();
      })
/*********End of Login & Register tab**********/

/*********Add booking form***************/
$("#reserveNow").click(function(event) {
  event.preventDefault();
  
  // create an array of users
  let customerArray = [];
  let bookingArr = [];
  let custEmail = $("#emailAddress").val();
  let custPhone = $("#phoneNumber").val();
  let custName = localStorage.getItem("customer");
  let bookID = Math.floor(Math.random() * 1000000);
  let bookTime = $("#time").val();
  let bookDate = $("#calendar").val();
  let bookNumberOfPeople = $("#numberPeople").val();

  if ($("#loginUser").val() != localStorage.getItem("customer")){
    alert("Please login as a user!");
  }else {
    bookingObject = {
      bookid: bookID,
      booktime: bookTime,
      bookdate: bookDate,
      booknumberofpeople: bookNumberOfPeople
    };
    bookingArr.push(bookingObject);
    //let bookingArr = localStorage.getItem("customer" + "_bookings");
    let customerObject = {
      custname: custName, 
      custemail: custEmail,
      custphone: custPhone,
      //custpass: custPass,
      booking: bookingArr
    };
    customerArray.push(customerObject);
    console.log(customerArray);
    localStorage.setItem("customerArray", JSON.stringify(customerArray));
  
    console.log(bookingObject);
    document.getElementById("custEmail").innerText = custEmail;
    document.getElementById("custPhone").innerText = custPhone;
    document.getElementById("bookID").innerText = bookID;
    document.getElementById("bookDate").innerText = bookDate;
    document.getElementById("bookTime").innerText = bookTime;
    document.getElementById("bookPpl").innerText = bookNumberOfPeople;
    $("#emailAddress").val('');
    $("#phoneNumber").val('');
    $("#numberPeople").val('');
    $("#calendar").val('');
    $("#time").val('');
    $("#specialRequest").val('');

  }
});