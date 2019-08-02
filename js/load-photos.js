'use strict';

(function () {

  var SRC_AVATAR = 'img/muffin-grey.svg';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photosContainer = document.querySelector('.ad-form__photo-container');
  var filesChooserPhotos = document.querySelector('.ad-form__upload input[type=file]');
  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview img');
  var photoWrapper = document.querySelector('.ad-form__photo');
  var photoWrapperTemplate = photoWrapper.cloneNode(true);

  var removePhotos = function () {
    var element = document.querySelectorAll('.ad-form__photo');
    element.forEach(function (item) {
      item.remove();
    });
  };

  var setDefaultAvatar = function () {
    avatarPreview.src = SRC_AVATAR;
  };

  var reset = function () {
    removePhotos();
    var defaultPhoto = photoWrapperTemplate.cloneNode(true);
    photosContainer.appendChild(defaultPhoto);
  };

  fileChooserAvatar.addEventListener('change', function () {
    window.error.removeModal();
    var file = fileChooserAvatar.files[0];

    if (file !== undefined) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });
        reader.readAsDataURL(file);
      } else {
        window.error.createModal('Wrong file type! Supported Formats: gif, jpg, jpeg, png');
      }
    } else {
      avatarPreview.src = SRC_AVATAR;
    }

  });

  var loadAllPhotos = function (img) {
    var WrapperPhoto = document.createElement('div');
    WrapperPhoto.classList.add('ad-form__photo');
    photosContainer.appendChild(WrapperPhoto);
    var adsPhotoPreviewImg = document.createElement('img');
    adsPhotoPreviewImg.style = 'height: 70px; width: 70px';
    adsPhotoPreviewImg.src = img;
    WrapperPhoto.appendChild(adsPhotoPreviewImg);
  };

  filesChooserPhotos.addEventListener('change', function () {
    window.error.removeModal();
    var filesForLoaded = filesChooserPhotos.files;

    if (filesForLoaded) {
      removePhotos();

      for (var i = 0; i < filesForLoaded.length; i++) {
        var fileName = filesForLoaded[i].name.toLowerCase();
        var matches = FILE_TYPES.some(function (type) {
          return fileName.endsWith(type);
        });

        if (!matches) {
          window.error.createModal('Wrong file type! Supported Formats: gif, jpg, jpeg, png');
          continue;
        }

        var fileReader = new FileReader();
        fileReader.addEventListener('load', function (evt) {
          loadAllPhotos(evt.srcElement.result);
        });

        fileReader.readAsDataURL(filesForLoaded[i]);
      }
    }
  });

  window.loadPhotos = {
    setDefaultAvatar: setDefaultAvatar,
    reset: reset
  };


})();
