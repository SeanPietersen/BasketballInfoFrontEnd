const signInDetail = document.getElementById('signInDetail');
const email = document.getElementById('signInEmail');
const password = document.getElementById('signInPassword');
var error = 0;

signInDetail.addEventListener('submit', (e) => {
    e.preventDefault();
    //get the values from the inputs
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    
    checkInputs(emailValue, passwordValue);

    if(error == 0)
    {
        var data = 
        {
            'email': emailValue,
            'password': passwordValue,
        };
        confirmLogin(data);
    }  
});

function checkInputs(emailValue, passwordValue)
{
    if(emailValue === '')
    {
        setErrorFor(email, 'Email cannot be empty');
        error++;
    } 
    else if(!isEmail(emailValue)){
        setErrorFor(email, 'Email is not valid');
        error++;
        
    }
    else
    {
        setSuccessFor(email);
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
    else
    {
        setSuccessFor(password);
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
    fetch('https://localhost:44375/api/users/signin', {
        
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
        if(json.status === 404)
        {
            alert("Username or password is incorrect");
        }
        if(json.status === 200)
        {
            alert(json.identityToken);
        }
    })
    .catch((data) => {
        console.log(data);
        alert("User doesnt exist");
    })
}