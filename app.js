const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id',doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // deleting data
    cross.addEventListener('click',(e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })
}

// getting data
 db.collection("cafes").get().then((snapshot) =>{ // For extra query .where('city', '<', 'n') 
    // console.log(snapshot.docs);                // For Order the data => .orderBy('name')
    snapshot.docs.forEach(doc => {
        // console.log(doc.data());
        renderCafe(doc);
    })
});

// saving data
form.addEventListener('submit',(e) => {
     e.preventDefault(); // Ignore the refresh function 
     db.collection('cafes').add({
         name: form.name.value, // name: => Field of Collection 
         city: form.city.value  // city: => Field of Collection
     });
     form.name.value = ''; // Clear the text box
     form.city.value = ''; // Clear the text box
});


