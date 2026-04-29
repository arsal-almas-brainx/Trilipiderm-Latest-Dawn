// Initialize collection boxes functionality
document.addEventListener('DOMContentLoaded', () => {
  const allCollectionBoxes = document.querySelectorAll('.collection-box');
  const allProductContainers = document.querySelectorAll('.routine-collection-products');

  allCollectionBoxes.forEach((box) => {
    box.addEventListener('click', () => {
      const sectionId = box.dataset.sectionId;
      const index = box.dataset.collectionIndex;

      // Find all boxes in the same section
      const sectionBoxes = document.querySelectorAll(`.collection-box[data-section-id="${sectionId}"]`);
      sectionBoxes.forEach((b) => b.classList.remove('active'));
      box.classList.add('active');

      // Find all product containers in the same section
      const sectionContainers = document.querySelectorAll(`.routine-collection-products[data-section-id="${sectionId}"]`);
      sectionContainers.forEach((container) => {
        if (container.dataset.collectionIndex === index) {
          container.classList.add('active');
          // Reset slider position
          const slider = container.querySelector('slider-component');
          if (slider) {
            const sliderList = slider.querySelector('.slider');
            if (sliderList) {
              sliderList.scrollLeft = 0;
            }
          }
        } else {
          container.classList.remove('active');
        }
      });
    });
  });
});
