const HTTP_METHOD = 'POST';

const getData = (url, onSuccess, onError) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => onError());
};

const sendData = (url, onSuccess, onError, body, method = HTTP_METHOD) => {
  fetch(url, {method, body})
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }
      onError();
    })
    .catch(() => onError());
};

export {getData, sendData};
