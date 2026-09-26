// Karta Kurdî — Supabase configuration
// Publishable/browser keys are designed to be used in the browser.
// NEVER put a Supabase secret/service-role key here.
const SUPABASE_URL = "https://mxyfmibktytuqaloctbk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_ceuR7RXYASW3fAwcpvMgtA_mnuYcbIx";

let supabaseClient = null;
if (SUPABASE_URL.startsWith("http") && !SUPABASE_URL.includes("PASTE_") &&
    !SUPABASE_PUBLISHABLE_KEY.includes("PASTE_")) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}

const $ = id => document.getElementById(id);
const form = $("cardForm");

function initials(name, surname) {
  return ((name?.[0] || "") + (surname?.[0] || "")).toUpperCase();
}
function updatePreview() {
  const name=$("name").value.trim()||"Awesta", surname=$("surname").value.trim()||"Egîd";
  $("pName").textContent=name; $("pSurname").textContent=surname;
  $("pGender").textContent=$("gender").value; $("pRegion").textContent=$("region").value||"—";
  $("pDialect").textContent=$("dialect").value||"—"; $("pCountry").textContent=$("country").value||"—";
  $("initials").textContent=initials(name,surname);
  $("miniName").textContent=name; $("miniSurname").textContent=surname;
  $("miniPhoto").textContent=initials(name,surname);
}
["name","surname","gender","region","dialect","country"].forEach(id => $(id).addEventListener("input",updatePreview));

$("photo").addEventListener("change", e => {
  const file=e.target.files?.[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=()=> {
    $("portrait").innerHTML=`<img src="${reader.result}" alt="Profile">`;
    $("miniPhoto").innerHTML=`<img src="${reader.result}" style="width:100%;height:100%;object-fit:cover;border-radius:15px" alt="">`;
  };
  reader.readAsDataURL(file);
});

function makeQR(id) {
  $("qr").innerHTML="";
  const target = `${location.origin}${location.pathname}?id=${encodeURIComponent(id)}`;
  if(window.QRCode) new QRCode($("qr"), {text:target,width:80,height:80,colorDark:"#073f4d",colorLight:"#ffffff"});
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  const status=$("status");
  const id="KRD-"+Date.now().toString(36).toUpperCase();
  $("cardId").textContent=id;
  makeQR(id);
  const data={
    card_id:id, name:$("name").value.trim(), surname:$("surname").value.trim(),
    gender:$("gender").value, region:$("region").value.trim(), dialect:$("dialect").value.trim(),
    country:$("country").value.trim(), visibility:$("visibility").value
  };

  if(!supabaseClient){
    localStorage.setItem("karta-kurdi-demo", JSON.stringify(data));
    status.textContent="Pêşdîtin hate tomarkirin. Ji bo tomarkirina online, Supabase di app.js de têxe.";
    return;
  }
  const {error}=await supabaseClient.from("digital_cards").insert(data);
  status.textContent=error ? "Tomarkirin serneket: "+error.message : "Karta te bi serkeftî hate tomarkirin.";
});

$("downloadBtn").addEventListener("click",()=>window.print());
updatePreview();
makeQR("KRD-DEMO");
