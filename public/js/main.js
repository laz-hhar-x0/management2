if (localStorage.getItem("isSmall") === "yes") {
  sidebarId.classList.add("small-sidebar");
} else {
  sidebarId.classList.remove("small-sidebar");
}

const toggleSidebar = () => {
  if (localStorage.getItem("isSmall") === "yes") {
    localStorage.setItem("isSmall", "no");
    sidebarId.classList.remove("small-sidebar");
  } else {
    localStorage.setItem("isSmall", "yes");
    sidebarId.classList.add("small-sidebar");
  }
};



let targetUrl = ""; 
let targetForm = null;
let currentAction = ""; 

function promptCode(url, action) {
  targetUrl = url;
  currentAction = action;

  const offcanvasEl = document.querySelector(".offcanvas.show");
  if (offcanvasEl) {
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
    offcanvas.hide();
  }

  document.getElementById("codePrompt").style.display = "block";
  document.getElementById("codeInput").value = "";
}


function closePrompt() {
  document.getElementById("codePrompt").style.display = "none";
  document.getElementById("codeInput").value = "";
  targetForm = null;
}





 

function showCodePrompt(action, url, form = null) {
  currentAction = action; 
  targetUrl = url;        
  targetForm = form;     

  document.getElementById("codePrompt").style.display = "block";
  document.getElementById("codeInput").value = "";

  const offcanvasEl = document.querySelector(".offcanvas.show");
  if (offcanvasEl) {
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
    offcanvas.hide();
  }
}




function checkCode() {
  const enteredCode = document.getElementById("codeInput").value;

  if (currentAction === "edit" && enteredCode === "admin@@") {
    window.location.href = targetUrl;
  }
  else if (currentAction === "editEtud" && enteredCode === "admin@@") {
    window.location.href = targetUrl;
  }
  else if (currentAction === "addProf" && enteredCode === "admin@prof") {
    window.location.href = targetUrl;
  } 
  else if (currentAction === "addEtud" && enteredCode === "admin@etud") {
    window.location.href = targetUrl;
  }
  else if (currentAction === "deleteProf" && enteredCode === "admin@") {
    targetForm.submit();
  } 
  else if (currentAction === "deleteEtud" && enteredCode === "admin@") {
    targetForm.submit();
  }
  else if (currentAction === "admin" && enteredCode === "1223") {
    window.location.href = targetUrl;
  }
  else {
    alert("🚫 Incorrect code for this action!");
    return;
  }

  closePrompt(); 
 
}
