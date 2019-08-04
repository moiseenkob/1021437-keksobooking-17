'use strict';

(function () {

  var SRC_AVATAR = 'img/muffin-grey.svg';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
  var photosContainerElement = document.querySelector('.ad-form__photo-container');
  var filesChooserPhotosElement = document.querySelector('.ad-form__upload input[type=file]');
  var fileChooserAvatarElement = document.querySelector('.ad-form__field input[type=file]');
  var previewElement = document.querySelector('.ad-form-header__preview img');
  var photoWrapperElement = document.querySelector('.ad-form__photo');
  var photoWrapperTemplate = photoWrapperElement.cloneNode(true);

  var removePhotos = function () {
    var blocksElements = document.querySelectorAll('.ad-form__photo');
    blocksElements.forEach(function (item) {
      item.remove();
    });
  };

  var setDefaultAvatar = function () {
    avatarPreviewElement.src = SRC_AVATAR;
  };

  var reset = function () {
    removePhotos();
    var defaultPhoto = photoWrapperTemplate.cloneNode(true);
    photosContainerElement.appendChild(defaultPhoto);
  };

  fileChooserAvatarElement.addEventListener('change', function () {
    window.error.removeModal();
    var file = fileChooserAvatarElement.files[0];

    if (file !== undefined) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          previewElement.src = reader.result;
        });
        reader.readAsDataURL(file);
      } else {
        window.error.createModal('Wrong file type! Supported Formats: gif, jpg, jpeg, png');
      }
    } else {
      avatarPreviewElement.src = SRC_AVATAR;
    }

  });

  var loadAllPhotos = function (img) {
    var WrapperPhoto = document.createElement('div');
    WrapperPhoto.classList.add('ad-form__photo');
    photosContainerElement.appendChild(WrapperPhoto);
    var adsPhotoPreviewImg = document.createElement('img');
    adsPhotoPreviewImg.style = 'height: 70px; width: 70px';
    adsPhotoPreviewImg.src = img;
    WrapperPhoto.appendChild(adsPhotoPreviewImg);
  };

  filesChooserPhotosElement.addEventListener('change', function () {
    window.error.removeModal();
    var filesForLoaded = filesChooserPhotosElement.files;

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
