let allBudgets = "";
let total = 0;

function StoreData()
{
    let newBudget = {client:document.getElementById("clientName").value, project:document.getElementById("projectName").value, budget:document.getElementById("budgetAmount").value};
    allBudgets = allBudgets + JSON.stringify(newBudget) + "|?";
    total = total + parseInt(document.getElementById("budgetAmount").value);
    localStorage.setItem('budget', allBudgets);
    localStorage.setItem('total', total.toString());
    console.log(allBudgets);
}
function ClearFields()
{
    document.getElementById("clientName").value = "";
    document.getElementById("projectName").value = "";
    document.getElementById("budgetAmount").value = "";
}

function GetData()
{
    let bigString = localStorage.getItem("budget");
    temp = bigString.split("|?");
    
    for(var i = 0; i < temp.length - 1; i++)
    {
        let parsed = JSON.parse(temp[i]);
        console.log(parsed);
        let row = document.createElement('tr');
        let clientName = document.createElement('td');
        let text1 = document.createTextNode(parsed.client);
        let projectName = document.createElement('td');
        let text2 = document.createTextNode(parsed.project);
        let budgetAmount = document.createElement('td');
        let text3 = document.createTextNode(parsed.budget);

        clientName.appendChild(text1);
        projectName.appendChild(text2);
        budgetAmount.appendChild(text3);

        row.appendChild(clientName);
        row.appendChild(projectName);
        row.appendChild(budgetAmount);

        document.getElementById("table").appendChild(row);
    }

    document.getElementById("total").innerHTML = "Total: " + localStorage.getItem("total");
}