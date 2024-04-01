let payment_type = null;
// Handle payment dom changes based on checking or credit card.
function handleTypeChange(src) {
    payment_type = src.value;
    if (src.value === 'checking'){
        card_elements = document.getElementsByClassName('card-info');
        for (let i = 0; i < card_elements.length; i++){
            card_elements[i].style.display = 'None';
        }
        checking_elements = document.getElementsByClassName('bank-info');
        for (let i = 0; i < checking_elements.length; i++){
            checking_elements[i].style.display = 'block';
        }
    } else {
        card_elements = document.getElementsByClassName('card-info');
        for (let i = 0; i < card_elements.length; i++){
            card_elements[i].style.display = 'block';
        }
        checking_elements = document.getElementsByClassName('bank-info');
        for (let i = 0; i < checking_elements.length; i++){
            checking_elements[i].style.display = 'none';
        }
    }
}

// Doing validation here.
function submit(){
    let loan_account_number = document.getElementById('account_number')
    let account_number_label = document.getElementById('account_number_label');
    let loan_error_msg = document.getElementById('account_number_loan_error_msg');
    if (!loan_account_number.value || loan_account_number.value.length < 1){
        account_number_label.style.color = 'red'
        loan_error_msg.style.display = 'block';
        return;
    }
    account_number_label.style.color = 'grey';
    loan_error_msg.style.display = 'none';

    let payment_type_label = document.getElementById('type-account-label');
    let payment_type_error_msg = document.getElementById('type-account_error_msg');
    if (!payment_type){
        payment_type_label.style.color = 'red';
        payment_type_error_msg.style.display = 'block';
        return;
    }
    payment_type_label.style.color = 'grey';
    payment_type_error_msg.style.display = 'none';

    if (payment_type === 'checking'){
        let form_input_arr = [
            'routing_number',
            'bank_number',
            'bank_number_confirm'
        ]

        for (let i = 0; i < form_input_arr.length; i++){
            let input = document.getElementById(`${form_input_arr[i]}`)
            let input_label = document.getElementById(`${form_input_arr[i]}_label`)
            let input_error_msg = document.getElementById(`${form_input_arr[i]}_error_msg`)

            if (!input.value || input.value.length < 1){
                input_label.style.color = 'red';
                input_error_msg.style.display = 'block';
                return;
            }
            if (form_input_arr[i] === 'bank_number_confirm' 
                && input.value !== document.getElementById('bank_number').value) {
                input_label.style.color = 'red';
                input_error_msg.style.display = 'block';
                input_error_msg.innerHTML = 'Bank Accounts do not match';
                return;
            }
            if (form_input_arr[i] === 'routing_number' 
                && (input.value + '').length > 9) {
                input_label.style.color = 'red';
                input_error_msg.style.display = 'block';
                input_error_msg.innerHTML = 'Routing Number cannot exceed 9 digits';
                return;
            }

            input_label.style.color = 'grey';
            input_error_msg.style.display = 'none';
        }

    } else if (payment_type === 'debit') {
        let form_input_arr = [
            'card_number',
            'name_card',
            'expiry_date',
            'cvv_card'
        ]

        for (let i = 0; i < form_input_arr.length; i++){
            let input = document.getElementById(`${form_input_arr[i]}`)
            let input_label = document.getElementById(`${form_input_arr[i]}_label`)
            let input_error_msg = document.getElementById(`${form_input_arr[i]}_error_msg`)

            if (!input.value || input.value.length < 1){
                input_label.style.color = 'red';
                input_error_msg.style.display = 'block';
                return;
            }
            if (form_input_arr[i] === 'cvv_card'
                && (input.value > 999 || input.value < 100)){
                input_label.style.color = 'red';
                input_error_msg.style.display = 'block';
                input_error_msg.innerHTML = 'CVV Must be 3 digits';
                return;
            }
            input_label.style.color = 'grey';
            input_error_msg.style.display = 'none';
        }
    }

    alert('Submission Success!');
}