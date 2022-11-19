const btn = document.getElementById('add_expense');
btn.addEventListener('click', saveToCrud);


function saveToCrud(e) {
  e.preventDefault();
  var expense_amount = document.getElementById('expense_amount').value;
  var description = document.getElementById('description').value;
  var category = document.getElementById('category').value;
  let myobj = {
    expense_amount,
    description,
    category
  };

  axios.post("https://crudcrud.com/api/dfa0e50162854c1db28a18c27efd908d/ExpenseData", myobj)
    .then((res) => {
      Showexpense(res.data);
    })
    .catch((err) => {
      document.body.innerHTML += "<h4>Something Went Wrong</h4>"
      console.log(err);
    })
}


function Showexpense(user) {
  const parentNode = document.getElementById('users');
  const HTML = `<li id="${user._id}"> <b>Expence Amount:</b> ${user.expense_amount}<b>Description:</b> ${user.description} 
    <b>Category:</b>${user.category}<button onclick="deleteUser('${user._id}')"> Delete Expense</button>
    <button onclick=EditUser('${user.expense_amount}','${user.description}','${user._id}')> Edit Expense</button> 
   </li>`;
  parentNode.innerHTML = parentNode.innerHTML + HTML;

}

window.addEventListener("DOMContentLoaded", () => {
  axios.get('https://crudcrud.com/api/dfa0e50162854c1db28a18c27efd908d/ExpenseData')
    .then((response) => {
      response.data.forEach((ele) => {
        Showexpense(ele);
      })
    })
    .catch((err) => {
      console.log(err);
    })
});

//function to remover user with same mail id
function removeUserFromScreen(userid) {
  const parentNode = document.getElementById('users');
  const childNodeToBeDeleted = document.getElementById(userid);
  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
};

//function to delete user from crud and screen
function deleteUser(Userid) {
  axios.delete(`https://crudcrud.com/api/dfa0e50162854c1db28a18c27efd908d/ExpenseData/${Userid}`)
    .then((res) => {
      removeUserFromScreen(Userid);
    })
    .catch((err) => {
      console.log(err);
    })
  //removeUserFromScreen(Userid)

};


function EditUser(amount, des, id) {
  var exp_amount = document.getElementById("expense_amount");
  exp_amount.value = amount;
  var descript = document.getElementById("description")
  descript.value = des;
  axios.delete(`https://crudcrud.com/api/dfa0e50162854c1db28a18c27efd908d/ExpenseData/${id}`)
    .then((res) => {
      removeUserFromScreen(id);
    })
    .catch((err) => {
      console.log(err);
    })


}
