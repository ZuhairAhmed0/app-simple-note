const bars = document.querySelector('#bars');
const header = document.querySelector('header strong');
const article = document.querySelector('.allNotes');
const recycle_pin = document.querySelector('.recycle_pin');
const manage = document.querySelector('.manage');
const $manage = document.querySelector('#manage');
const manageCat = document.querySelector('.manageCat');
const addManage = document.querySelector('.addManage')
const aside = document.querySelector('aside');
const AddNote = document.querySelector('main button');
const writeNote = document.querySelector('.text');
const saveNote = document.querySelector('.text .head button');
const titleNote = document.querySelector('.text .body input');
const bodyNote = document.querySelector('.text .body textarea');
const clos = document.querySelector('.close'); 
const overly = document.querySelector('.overly');
const notes = document.querySelector('.all_notes');
const all_notes = document.querySelector('.all_notes samp');
const uncategorised = document.querySelector('.uncategorised samp');
const uncategori = document.querySelectorAll('.uncategorised');
const uncate = document.querySelector('.uncate');
const recycle = document.querySelector('.recycle samp');
const $recycle = document.querySelector('.recycle');
const caret_down = document.querySelector('.fa-caret-down')
let mobile_view = window.matchMedia("(min-width: 700px)");
const now = new Date();
function openAside() {
    if(mobile_view.matches == false) {
        aside.style = 'left: -200%; transition: 1s';
    }
}
bars.addEventListener('click', function(e) {
    aside.style = 'left: 0; transition: 1s';
})
clos.addEventListener('click',openAside);
article.addEventListener('click', openAside);
overly.addEventListener('click', openAside);
recycle_pin.addEventListener('click', openAside);
manage.addEventListener('click', openAside);
AddNote.addEventListener('click', function(){
    writeNote.style = 'top: 30px; transition: 0.2s';
    bodyNote.focus();
});
const options = {year: 'numeric', month: 'short', day: 'numeric',} 
const fulltime = new Intl.DateTimeFormat('en-SD', options).format(now);
all_notes.textContent = 0;
uncategorised.textContent = 0;
recycle.textContent = 0;

saveNote.addEventListener('click', function(){
    if (titleNote.value != '' || bodyNote.value != '') {
        const html = `
            <div class="note">
                <div class="i">
                    <i class="fa fa-ellipsis-v"></i>
                </div>
                <div>
                    <h4 dir="auto">${titleNote.value}</h4>
                    <p dir="auto">${bodyNote.value}</p>
                </div>
                <div class="time">
                    Modified: ${fulltime},
                    ${now.getHours()}:
                    ${now.getMinutes()} / 
                    Created: ${fulltime},
                    ${now.getHours()}:
                    ${now.getMinutes()}
                </div>
                <div class="more">
                    <p class="edit">Edit</p>
                    <p class="delete">Delete</p>
                </div>
            </div>`;
        article.insertAdjacentHTML('afterbegin', html);
        save.call(notes)
        all_notes.textContent++;
        uncategorised.textContent++;
        overly.style.display = 'none';
        titleNote.value = '';
        bodyNote.value = '';
    }
    writeNote.style = 'top: 100%; transition: 0.2s';
});






let caret = true;
caret_down.addEventListener('click', () => {
    if(caret == true) {
        uncategori.forEach(a => a.style = 'transition: .5s; opacity: 0; transform: translateY(5rem);')
        caret = false;
    }else {
        uncategori.forEach(a => a.style = 'transition: .5s; opacity: 1; transform: translateY(0)');
        caret = true;
    }
})
let $more = true;
article.addEventListener('click', (e) => {
    if(e.target.classList.contains('fa-ellipsis-v') && $more == true) {
        e.target.parentElement.parentElement.lastElementChild.style = 'display: block';
        $more = false;
    } else {
        if(e.target.classList.contains('fa-ellipsis-v')) {
            e.target.parentElement.parentElement.lastElementChild.style = 'display: none';
            $more = true;
        }
    }
    if(e.target.classList.contains('delete')){
        const html = `
                        <div class="note">
                            <div>
                                <h4 dir="auto">${e.target.parentElement.parentElement.firstElementChild.nextElementSibling.firstElementChild.textContent}</h4>
                                <p dir="auto">${e.target.parentElement.parentElement.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.textContent}</p>
                            </div>
                            <div class="time">
                                Created: ${fulltime},${now.getHours()}:${now.getMinutes()} / Deleted: ${fulltime},${now.getHours()}:${now.getMinutes()}
                            </div>
                            <div class="more">
                                <p class="edit">Edit</p>
                                <p class="delete">Delete</p>
                            </div>
                        </div>`;
        recycle_pin.insertAdjacentHTML('afterbegin', html)
        all_notes.textContent--;
        uncategorised.textContent--;
        recycle.textContent++;
        e.target.parentElement.parentElement.remove();
    }
    if(e.target.classList.contains('edit')) {
        writeNote.style = 'top: 30px; transition: 0.2s';
        bodyNote.focus();
        titleNote.value = e.target.parentElement.parentElement.firstElementChild.nextElementSibling.firstElementChild.textContent;
        bodyNote.value = e.target.parentElement.parentElement.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.textContent;
    }
})
manage.addEventListener('click', function () {
    addManage.style = 'opacity: 1; transition: 0.3s';
})
addManage.addEventListener('click', function(e){
    if(e.target.classList.contains('add') && this.firstElementChild.value != ''){
        const html =  `
        <section class="uncategorised">
            <div>
                <i class="fa fa-book"></i>
                <span>${this.firstElementChild.value}</span>
            </div>
        </section>`
        $manage.insertAdjacentHTML('beforebegin', html);
        this.firstElementChild.value = '';
    }
})
$recycle.addEventListener('click', function (e) {
    recycle_pin.classList.add('opacity');
    article.classList.remove('opacity');
    manage.classList.remove('opacity');
    header.textContent = this.firstElementChild.lastElementChild.textContent;
})
function save() {
    article.classList.add('opacity');
    recycle_pin.classList.remove('opacity');
    manage.classList.remove('opacity');
    header.textContent = this.firstElementChild.lastElementChild.textContent;
}
notes.addEventListener('click', save)
uncate.addEventListener('click', function (e) {
    article.classList.add('opacity');
    recycle_pin.classList.remove('opacity');
    manage.classList.remove('opacity');
    header.textContent = this.firstElementChild.lastElementChild.textContent;
})
$manage.addEventListener('click', function(e) {
    overly.style =  'opacity: 0';
    manage.classList.add('opacity');
    recycle_pin.classList.remove('opacity');
    article.classList.remove('opacity');
    header.textContent = this.firstElementChild.lastElementChild.textContent;
})