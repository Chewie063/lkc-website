/**
 * Page Indicator Class
 */
class PageIndicator {
    constructor(element) {
      this._element = element;
      this._pages = Array.from(element.querySelectorAll('a'));
      this._index = this._getIndex();
      this._indicatorWrap = element.querySelector('.gallery-dots-container');
      this._indicator = element.querySelector('.gallery-dots');
      this._spacing = parseInt(window.getComputedStyle(this._pages[0]).marginRight);
      this._size = parseInt(window.getComputedStyle(this._pages[0]).width);
      this._canAnimate = true;
      
      this._bindEventListeners();
    }
    
    /**
     * Returns the index of the active element if available
     * otherwise 0 is returned
     * 
     * @return { int } index
     */
    _getIndex() {
      let index = 0;
      
      for (let i = 0; i < this._pages.length; i++) {
        if (this._pages[i].classList.contains('active')) {
          index = i;
          break;
        }
      }
      
      return index;
    }
    
    /**
     * Binds the click listener to the elements
     *
     * @return void
     */
    _bindEventListeners() {
      this._pages.forEach((page) => {
        page.addEventListener('click', (e) => {
          e.preventDefault();
          if (this._canAnimate) {
              this._changePage(this._pages.indexOf(page));
          }
        });
      });
    }
    
    /**
     * Changes the page to the given index
     *
     * @param { int } index
     * @return void
     */
    _changePage(index) {
      this._canAnimate = false;
      
      let timeline = new TimelineMax({ 
        onComplete: () => {
          this._canAnimate = true;
        }
      }),
          x = this._size * index + this._spacing * index;
      
      let steps = index - this._index;
      
      if (steps <= 0) {
          this._element.classList.remove('direction-right');
          this._element.classList.add('direction-left');
      } else {
          this._element.classList.remove('direction-left');
          this._element.classList.add('direction-right');
      }
      
      steps = Math.abs(steps);
      
      let width = this._size * (steps + 1) + this._spacing * steps;
      
      timeline.add(
        TweenMax.to(this._indicator, .3, {
          width: width,
          ease: Expo.easeInOut
        })
      );
      
      timeline.add(
        TweenMax.to(this._indicatorWrap, .3, {
          x: x,
          ease: Expo.easeInOut
        }),
        .3
      );
      
      timeline.add(
        TweenMax.to(this._indicator, .3, {
          width: this._size,
          ease: Expo.easeInOut
        }),
        .3
      );
      
      this._changeActivePage(index);
      this._index = index;
    }
    
    /**
     * Changes the active page
     *
     * @param { int } index
     */
    _changeActivePage(index) {
        this._pages[this._index].classList.remove('active');
        this._pages[index].classList.add('active');
    }
  }
  
  document.querySelectorAll('.page-indicator').forEach((pageIndicator) => {
    new PageIndicator(pageIndicator);
  });