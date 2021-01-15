# 니꼬튜브 - NicoTube

- <a href="https://nomardcoder.co">노마드코더</a> 유튜브클론 강의를 수강하여 제작할 수 있었던 결과물입니다.
- **2020년 노마드코더 어워즈 대상**에 선정되었고, 부상으로 에어팟 프로를 받았습니다.
- 링크를 눌러 구경해보세요 >> **<a href="https://stormy-hollows-56478.herokuapp.com/"> 니꼬튜브 구경하기 </a>**
<br><br>

**1. 홈 화면**
- 최대한 2020년도 유튜브 디자인과 비슷하게 디자인하였습니다.
- 유튜브에서 해당 채널에서 보는 화면을 기준으로 홈 화면을 디자인하였습니다.
- 메뉴 자체 기능은 별도로 구현하지 않았습니다. 오로지 SCSS를 연습하기 위한 목적으로 디자인하였습니다.
- SCSS를 처음 사용해보았기 때문에 홈 화면 디자인 연습이 도움이 많이 되었습니다.<br><br>
<img width=600 src="https://github.com/beliemun/wetube/blob/master/md/screen_shot_01.png?raw=true"/><br><br>

**2. 회원가입 화면**
- 이름, 이메일, 비밀번호로 가입이 가능한 회원가입 화면입니다.
- 이메일 로그인, 깃허브 로그인, 카카오 로그인을 구현하였습니다.
- 강의에 있었던 페이스북 로그인을 빼고, 카카오 로그인을 추가로 넣었습니다. <br><br>
<img width=600 src="https://github.com/beliemun/wetube/blob/master/md/screen_shot_02.png?raw=true"/><br><br>

**3. 프로필 화면**
- 가입자 정보를 볼 수 있는 프로필 화면입니다.
- 깃허브와 카카오 아이디를 확인할 수 있으며, 이메일이 같은 경우 하나의 계정으로 병합되도록 구현하였습니다.
- 본인의 경우 프로필 수정, 비밀번호 수정이 가능합니다.
- 회원의 아이디를 알 수 있더라도 로그인한 회원이 아닌경우 수정에 접근할 수 없도록 라우팅 프로텍트를 적용하였습니다.
- 해당 회원이 업로드한 게시물 리스트가 하단에 나타납니다. <br><br>
<img width=600 src="https://github.com/beliemun/wetube/blob/master/md/screen_shot_03.png?raw=true"/><br><br>

**4. 프로필 수정 화면**
- 회원은 아이디와 이메일, 그리고 사진을 변경할 수 있습니다. <br><br>
<img width=600 src="https://github.com/beliemun/wetube/blob/master/md/screen_shot_04.png?raw=true"/><br><br>

**5. 동영상 등록 화면**
- 동영상을 등록하는 화면입니다. (로그인 전용)
- 강의 내용과 다르게 동영상 등록 시 썸네일 이미지가 필수로 필요하도록 구현하였습니다.
- 연결되어있는 카메라가 있을 경우 녹화할 수 있도록 기능을 구현하였습니다. <br><br>
<img width=600 src="https://github.com/beliemun/wetube/blob/master/md/screen_shot_05.png?raw=true"/><br><br>

**6. 검색 화면**
- 검색 결과가 별도의 유아이로 보여지도록 구현하였습니다. <br><br>
<img width=600 src="https://github.com/beliemun/wetube/blob/master/md/screen_shot_06.png?raw=true"/><br><br>

**7. 게시물 화면**
- 동영상과 댓글이 서로 잘 보일 수 있도록 디자인하였습니다.
- 본문의 내용 중 링크가 동작할 수 있도록 기능을 추가하였습니다.
- 본인의 댓글만 삭제 될 수 있도록 구현하였습니다.
- 내부 API를 이용하여 댓글을 즉시 작성하고, 즉시 삭제될 수 있도록 구현하였습니다.
- 작성자의 사진이 보이도록 하였고, 작성자의 이름이나 사진을 누를 경우 해당 회원 프로필로 이동하도록 기능을 추가하였습니다. <br><br>
<img width=600 src="https://github.com/beliemun/wetube/blob/master/md/screen_shot_07.png?raw=true"/><br><br>

**8. 모달**
- 댓글 작성시 로그인 정보가 없을 경우 모달이 나타납니다.<br><br>
<img width=600 src="https://github.com/beliemun/wetube/blob/master/md/screen_shot_08.png?raw=true"/><br><br>


