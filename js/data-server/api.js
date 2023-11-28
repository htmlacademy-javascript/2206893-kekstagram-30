const Method = {
  POST: 'POST',
};

const getData = (url, onSuccess, onError) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => onError());
};

const sendData = (url, onSuccess, onError, body) => {
  fetch(url, {method: Method.POST, body})
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
