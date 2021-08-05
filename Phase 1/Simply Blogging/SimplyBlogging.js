let blogs = 0;
let rows = 0;

function AddBlog()
{

    if(document.getElementById('titleInput').value == "")
    {
        alert("Please enter a title");
    }
    else if(document.getElementById('articleInput').value == "")
    {
        alert("Please enter your Article Text");
    }

    if(blogs <= 3)
    {
        console.log("Adding new Card.");

        blogs++;

        let column = document.createElement('div');
        column.setAttribute('class','col-md-3');

        let newCard = document.createElement('div');
        newCard.setAttribute('class', 'card');
        newCard.setAttribute('style', 'width: 18rem;');

        let cardImg = document.createElement('img');
        cardImg.setAttribute('class', 'card-img-top');
        cardImg.setAttribute('style', 'width: 100%; height: fit-content; object-fit: cover;');
        cardImg.setAttribute('src', document.getElementById("imageInput").value);

        let cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body');

        let cardTitle = document.createElement('h5');
        cardTitle.innerHTML = document.getElementById("titleInput").value;

        let cardText = document.createElement('p');
        cardText.setAttribute('class', 'card-text');
        cardText.innerHTML = document.getElementById("articleInput").value;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);

        newCard.appendChild(cardBody);
        newCard.appendChild(cardImg);

        column.appendChild(newCard);

        document.getElementById("blogs"+rows).appendChild(column);

    }
    else if(blogs > 3)
    {
        console.log("Starting new row and adding new card.");

        blogs = 1;
        rows++;

        let newRow = document.createElement('div');
        newRow.setAttribute('id','blogs'+rows);
        newRow.setAttribute('class', 'row');
        newRow.setAttribute('style','margin-top: 15px; margin-bottom: 15px');
        document.getElementById("blogContainer").appendChild(newRow);

        let column = document.createElement('div');
        column.setAttribute('class','col-md-3');

        let newCard = document.createElement('div');
        newCard.setAttribute('class', 'card');
        newCard.setAttribute('style', 'width: 18rem;');

        let cardImg = document.createElement('img');
        cardImg.setAttribute('class', 'card-img-top');
        cardImg.setAttribute('style', 'width: 100%; height: fit-content; object-fit: cover;');
        cardImg.setAttribute('src', document.getElementById("imageInput").value);

        let cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body');

        let cardTitle = document.createElement('h5');
        cardTitle.innerHTML = document.getElementById("titleInput").value;

        let cardText = document.createElement('p');
        cardText.setAttribute('class', 'card-text');
        cardText.innerHTML = document.getElementById("articleInput").value;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);

        newCard.appendChild(cardBody);
        newCard.appendChild(cardImg);

        column.appendChild(newCard);

        document.getElementById("blogs"+rows).appendChild(column);
    }

    console.log("Number of blogs: " + blogs);
}

function clearFields()
{
    document.getElementById("titleInput").value = "";
    document.getElementById("articleInput").value = "";
    document.getElementById("imageInput").value = "";
}