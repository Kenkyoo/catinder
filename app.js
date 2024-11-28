import { TheCatAPI } from "@thatapicompany/thecatapi";
import { Fancybox } from "@fancyapps/ui";
import Swal from 'sweetalert2'
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const tabs = new Tabby('[data-tabs]');

const theCatAPI = new TheCatAPI("live_s7PPBUb1ZMsADaBG8Wb4awOjPMMfbmKyLaocqJo4wIJx8Nd3wiAThaCg6zm5ewyL");

let imageId = null;

let sub_id = localStorage.getItem('sub_id') || Math.random().toString(36).substr(2, 9);
localStorage.setItem('sub_id', sub_id);

async function fetchData() {
    try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const x = data[0];
        showImage(x);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function showImage(data) {
    const container = document.getElementById('container');
    container.innerHTML = '';
    const img = document.createElement('img');
    img.classList.add('pure-img-responsive');
    img.src = data.url;
    img.dataset.id = data.id;
    img.width = 400;
    img.height = 400;
    container.appendChild(img);

    imageId = data.id;
}

function showFavourites(imagesData) {
  const grid = document.getElementById('grid');
  grid.innerHTML = ''; // Clear existing favorites
  imagesData.forEach(function(imageData) {
    const a = document.createElement('a');
    a.href = imageData.image.url;
    a.dataset.fancybox = 'gallery';
    const img = document.createElement('img');
    img.src = imageData.image.url;
    img.classList.add("pure-img-responsive");
    const gridCell = document.createElement('div');
    gridCell.className = 'col col-lg';
    a.appendChild(img);
    gridCell.appendChild(a);
    grid.appendChild(gridCell);
  });
}


async function getUserFavourites(sub_id) {
  const favourites = await theCatAPI.favourites.getFavourites(sub_id);
  document.getElementById('grid').innerHTML = '';
  showFavourites(favourites);  
}

async function favouriteImage() {
  fetchData();
  if (!imageId) {
    console.error('No se ha seleccionado ninguna imagen para guardar en favoritos.');
    return;
  }

  try {
    const favourite = await theCatAPI.favourites.addFavourite(imageId, sub_id);
    console.log('Imagen guardada en favoritos:', favourite);
    await getUserFavourites(sub_id); // Actualiza la lista de favoritos
    alertSaveFavs()
  } catch (error) {
    console.error('Error al guardar en favoritos:', error);
  }
}

async function deleteFavourites() {
  try {
      const favourites = await theCatAPI.favourites.getFavourites(sub_id);
      
      for (const favourite of favourites) {
          await theCatAPI.favourites.deleteFavourite(favourite.id);
      }

      // Limpiar la lista de favoritos en la UI
      document.getElementById('grid').innerHTML = '';
      
  } catch (error) {
      console.error('Error al eliminar favoritos:', error);
      Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Ocurrió un error al eliminar los favoritos.",
          showConfirmButton: false,
          timer: 1500
      });
  }
}

function deleteConfirm() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      deleteFavourites();  // Aquí se llama a la función para eliminar los favoritos
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  });
  
}

function alertSaveFavs() {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Se ha añadido correctamente a favoritos",
    showConfirmButton: false,
    timer: 1500
  });
}

function aboutTheApp() {
  Swal.fire({
    title: "Gracias por usar mi app!",
    width: 600,
    padding: "3em",
    color: "#716add",
    background: "#fff  url(images/nyan-cat-nyan.gif)",
    backdrop: `
      rgba(0,0,123,0.4)
      url("images/nyan-cat-nyan.gif")
      left top
      no-repeat
    `
  });
}

fetchData()
getUserFavourites(sub_id);

document.getElementById('deleteBtn').addEventListener('click', deleteConfirm);
document.getElementById('nextBtn').addEventListener('click', fetchData);
document.getElementById('aboutBtn').addEventListener('click', aboutTheApp);
document.getElementById('saveBtn').addEventListener('click', (event) => {
  favouriteImage();
});

Fancybox.bind("[data-fancybox]", {
  // Your custom options
});
