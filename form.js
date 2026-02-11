
document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('form-recipe');

    const cakeSizeInput = document.getElementById('cake-size');
    const cakeSizeError = document.getElementById('cake-size-error');

    const spongeSelect = document.getElementById('sponge-flavor');
    const spongeError = document.getElementById('sponge-flavor-error');

    const fruitInputs= document.querySelectorAll('input[name="fruits"]');
    const fruitsError= document.getElementById('fruits-error');

    const SocialInput = document.getElementById('social-handle');
    const SocialError= document.getElementById('social-handle-error');

    const handleRegex = /^@[A-Za-z0-9_.-]{2,}$/;

    const checklistCake   = document.querySelector('.checklist-cake');
    const checklistSponge = document.querySelector('.checklist-sponge');
    const checklistFruits = document.querySelector('.checklist-fruits');
    const checklistHandle = document.querySelector('.checklist-handle');

    const submitButton = document.querySelector('.button-submit');
    const resetButton = document.querySelector('.button-reset');



    function updateSubmitState(){
        const ok = checklistCake.classList.contains('checklist-valid') &&
        checklistSponge.classList.contains('checklist-valid') &&
        checklistFruits.classList.contains('checklist-valid') &&
        checklistHandle.classList.contains('checklist-valid');
        
        submitButton.disabled = !ok;

    }

    function updateChecklistItem(item,isValid)
    {
        if(!item) return;
        if(isValid){
            item.classList.add('checklist-valid');
        }
        else
        {
            item.classList.remove('checklist-valid');
        }
    }

    function validateCakeSize(){
        const value =cakeSizeInput.value.trim();

        if(value=='')
        {
            cakeSizeError.textContent='please enter cake size';
            updateChecklistItem(checklistCake,false);
            return false;
        }

        const number = Number(value);
        if(!Number.isInteger(number)||number<4||number>40)
        {
            cakeSizeError.textContent='use a number between 4 and 40';
            updateChecklistItem(checklistCake,false);
            return false;
        }

        cakeSizeError.textContent='';
        updateChecklistItem(checklistCake,true);
        return true;

    }


    function validateSpongeFlavour(){
        const value= spongeSelect.value;
        if(!value){
            spongeError.textContent='please choose a sponge flavor';
            updateChecklistItem(checklistSponge,false);
            return false;
        }

        spongeError.textContent='';
        updateChecklistItem(checklistSponge,true);
        return true;
    }

    function validateFruits(){
        let any = false;

        fruitInputs.forEach(function(input){
            if(input.checked){
                any =true;
            }
        });

        if(!any)
        {
            fruitsError.textContent='choose at least one fruit';
            updateChecklistItem(checklistFruits, false);
            return false;
        }

        fruitsError.textContent='';
        updateChecklistItem(checklistFruits, true);
        return true;

    }

    function validateHandle(){
        const value = SocialInput.value.trim()
        if(value==''){
            SocialError.textContent='please enter the handle';
            updateChecklistItem(checklistHandle, false);
            return false;
        }

        if(!handleRegex.test(value)){
            SocialError.textContent='start with @ and use at least 3 chars';
            updateChecklistItem(checklistHandle, false);
            return false;
        }

        SocialError.textContent='';
        updateChecklistItem(checklistHandle, true);
        return true;
    }

    function CleanForm(){
        form.reset();

        cakeSizeError.textContent='';
        spongeError.textContent='';
        fruitsError.textContent='';
        SocialError.textContent='';

        checklistCake.classList.remove('checklist-valid');
        checklistFruits.classList.remove('checklist-valid');
        checklistHandle.classList.remove('checklist-valid');
        checklistSponge.classList.remove('checklist-valid');

        updateSubmitState();

    }



    cakeSizeInput.addEventListener('input',function(){validateCakeSize(); updateSubmitState();});
    cakeSizeInput.addEventListener('change',function(){validateCakeSize(); updateSubmitState();});
    spongeSelect.addEventListener('change',function(){validateSpongeFlavour(); updateSubmitState();});
    fruitInputs.forEach(function(input){
        input.addEventListener('change',function(){validateFruits(); updateSubmitState();});
    });
    SocialInput.addEventListener('input', function(){validateHandle(); updateSubmitState();});
    SocialInput.addEventListener('change', function(){validateHandle(); updateSubmitState();});

    form.addEventListener('submit',function(event){
        const ok = validateCakeSize() && validateSpongeFlavour() && validateFruits() && validateHandle();
        if(!ok)
        {
            event.preventDefault();
            return;
        }

        CleanForm();

    });

    resetButton.addEventListener('click',function(event){
        event.preventDefault();
        CleanForm();
    });




    updateSubmitState();
});