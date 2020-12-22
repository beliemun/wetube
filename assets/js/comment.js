import axios from "axios";
import showRequiredModal from "./requiredModal";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const increaseCommentNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const decreaseCommentNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteComment = (target) => {
    commentList.removeChild(target);
}

const sendCommentToDeleteAPI = (event) => {
    const target = event.target.parentNode.parentNode.parentNode;
    const commentId = target.id;
    const videoId = window.location.href.split("/videos/")[1];
    axios({
        url: `/api/${videoId}/delete-comment`,
        method: "POST",
        data: {
            commentId
        }
    }).then(() => {
        deleteComment(target);
        decreaseCommentNumber();
    }).catch(error => {
        console.log(error);
    })
}

const addComment = (comment, name, avatarUrl, commentId) => {
    const li = document.createElement("li");
    li.classList.add("comment__item");
    li.addEventListener("click", sendCommentToDeleteAPI);
    li.id = commentId;

    const img = document.createElement("img");
    img.classList.add("comment__avatar");
    li.appendChild(img);
    img.src = avatarUrl;

    const divCommentContent = document.createElement("div");
    divCommentContent.classList.add("comment__content");
    li.appendChild(divCommentContent);

    const divCommentTitle = document.createElement("div");
    divCommentTitle.classList.add("comment__title");
    divCommentContent.appendChild(divCommentTitle);

    const divCommentText = document.createElement("div");
    divCommentText.classList.add("comment__text");
    divCommentContent.appendChild(divCommentText);

    const spanName = document.createElement("span");
    spanName.classList.add("comment__name");
    divCommentTitle.appendChild(spanName);
    spanName.innerHTML = name;

    const spanCreatedAt = document.createElement("span");
    spanCreatedAt.classList.add("comment__created-at");
    divCommentTitle.appendChild(spanCreatedAt);
    spanCreatedAt.innerHTML = (new Date()).toISOString().slice(5, 10);

    const pCommentText = document.createElement("p");
    divCommentText.appendChild(pCommentText);
    pCommentText.innerHTML = comment;

    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("comment__delete");
    divCommentText.appendChild(buttonDelete);
    buttonDelete.innerHTML = "X";

    commentList.prepend(li);
    increaseCommentNumber();
};

const sendCommentToAddAPI = async (comment, name, avatarUrl) => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: "POST",
        data: {
            comment,
        },
    });
    if (response.status === 200) {
        addComment(comment, name, avatarUrl, response.data.id);
    }
};

const checkLogin = (event) => {
    event.preventDefault();
    axios({
        url: "/api/check-login",
        method: "POST",
    }).then(response => {
        if (response.status === 200) {
            const commentInput = addCommentForm.querySelector("input.comment__input");
            const comment = commentInput.value;
            if (comment.trim() === "") {
                commentInput.value = "";
                return;
            }
            const {
                data: { name, avatarUrl }
            } = response;
            sendCommentToAddAPI(comment, name, avatarUrl);
            commentInput.value = "";
        } else if (response.status === 204) {
            showRequiredModal();
        }
    })
}

const init = () => {
    // 코멘트 추가를 위한 이벤트 등록
    addCommentForm.addEventListener("submit", checkLogin);

    // 코멘트 삭제를 위한 이벤트 등록
    const deleteButtons = commentList.getElementsByClassName("comment__delete");
    deleteButtons.forEach(e => {
        e.addEventListener("click", sendCommentToDeleteAPI);
    })
};

if (addCommentForm) {
    init();
}