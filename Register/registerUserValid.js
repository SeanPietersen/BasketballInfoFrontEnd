const logginDetail = document.getElementById('logginDetail');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('passwordConfirm');
error = 0;

logginDetail.addEventListener('submit', (e) => {
    e.preventDefault();

    //get the values from the inputs
    const firstNameValue =firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const passwordConfirmValue = passwordConfirm.value.trim();

    checkInputs(firstNameValue, lastNameValue, emailValue, passwordValue, passwordConfirmValue);
    
    if(error == 0)
    {
        var data = 
        {
            'email': emailValue,
            'firstName': firstNameValue,
            'lastName': lastNameValue,
            'password': passwordValue
        };
        confirmLogin(data);
    }  
});

function checkInputs(firstNameValue, lastNameValue, emailValue, passwordValue, passwordConfirmValue)
{
    if(firstNameValue === '')
    {
        setErrorFor(firstName, 'First Name cannot be empty');
        error++;
    }
    else{
        error = 0;
    }

    if(lastNameValue === '')
    {
        setErrorFor(lastName, 'Last Name cannot be empty');
        error++;
    }
    else {
        error = 0;
    }

    if(emailValue === '')
    {
        setErrorFor(email, 'Email cannot be empty');
        error++;
    } 
    else if(!isEmail(emailValue)){
        setErrorFor(email, 'Email is not valid');
        error++;
    }
    else{
        error = 0;
    }

    if(passwordValue === '')
    {
        setErrorFor(password, 'Password cannot be empty');
        error++;
    }
    else if(!isPassword(passwordValue))
    {
        setErrorFor(password, 'Password must be at least 8 characters long with 1 letter and 1 number.');
        error++;
    }
    else{
        error = 0;
    }

    if(passwordConfirmValue === '')
    {
        setErrorFor(passwordConfirm, 'Password cannot be empty');
        error++;
    }
    else if(passwordValue !== passwordConfirmValue)
    {
        setErrorFor(passwordConfirm, 'Passwords do not match');
        error++;
    }
    else {
        error = 0;
    }
}

function setErrorFor(input, message)
{
    const formControl = input.parentElement; //.form-control
    const small = formControl.querySelector('small');

    //add error message inside small
    small.innerText = message;

    //add error class
    formControl.className = 'form-control error';
}

function setSuccessFor(input)
{
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) 
{
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isPassword(password) 
{
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}

function confirmLogin(data)
{
    fetch('https://localhost:44375/api/users/register', {
        
        method: "POST",
        headers:
        {
            'Content-type': 'application/json; charset=UTF-8',
            'Accept': '*/*'
            
        },
        body: JSON.stringify(data),
       
    })
    .then(response => response.json())
    .then(json => {
        if(json.status === 409)
        {
            setErrorFor(email, 'User already exists');
            
        }
        else
        {
            setSuccessFor(firstName);
            setSuccessFor(lastName);
            setSuccessFor(email);
            setSuccessFor(password);
            setSuccessFor(passwordConfirm);
            window.location.replace('http://127.0.0.1:5500/Home/home.html');
            // alert(json.identityToken);
        }
        
    })
    .catch((data) => {
        console.log(data);
        alert("User was not registered successfully");
    })
}