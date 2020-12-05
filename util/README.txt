0. Không cần export tại file firebase.config, muốn dùng gì thì cứ tạo biết gọi firebase ra là được
Như ở file firebaseExample.js : tạo database chỉ cần dùng firebase.database() chứ không cần import firebase từ firebase.config
1. Đã tạo sẵn 3 table trong firebase gồm : 
+ products
+ detailOrder
+ categories
Khi write data mới nhớ đọc syntax mẫu trong file firebaseExample.js tránh ghi đè lên dữ liệu có sẵn
2. Mọi file dùng để init firebase đều được thêm,  không cần thêm lại
3. Không đụng gì đến file firebaseExample.js, khi import file js có sử dụng firebase thì để type="module"
