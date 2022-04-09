const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#review-bookname').value.trim();
  const reviewRating = document.querySelector('#review-rating').value.trim();
  const description = document.querySelector('#review-desc').value.trim();

  if (name && reviewRating && description) {
    const response = await fetch(`/api/reviews`, {
      method: 'POST',
      body: JSON.stringify({ name, reviewRating, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('RESPONSEEE!!!!', response);
    
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      console.log('ERROR!!!!!');
      alert('Failed to create a comment');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/reviews/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete comment');
    }
  }
};

document
  .querySelector('.new-review-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.review-list')
  .addEventListener('click', delButtonHandler);
