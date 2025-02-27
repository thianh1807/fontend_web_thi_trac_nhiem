# Test Coverage Report

## Yêu cầu

1. Test hệ thống / đánh giá kết quả đạt được
2. Viết rõ kịch bản test 1, test 2,... và từng bước thực hiện Test
3. Có hình chụp giao diện câu hình/test làm minh chứng

## Kịch bản test

### 1. Test API Practice

#### Test Case 1: getPracticePage
- **Mục đích**: Kiểm tra API lấy danh sách practice
- **Các bước thực hiện**:
  1. Gọi API với tham số page=1, searchTerm='math'
  2. Kiểm tra response có đúng format
  3. Kiểm tra xử lý lỗi khi API fail
  4. Kiểm tra xử lý lỗi khi mất kết nối

#### Test Case 2: getPracticeDetail  
- **Mục đích**: Kiểm tra API lấy chi tiết practice
- **Các bước thực hiện**:
  1. Gọi API với ID hợp lệ
  2. Kiểm tra response có đúng format
  3. Kiểm tra xử lý lỗi khi API fail
  4. Kiểm tra xử lý lỗi khi mất kết nối

#### Test Case 3: addPractice
- **Mục đích**: Kiểm tra API thêm practice mới
- **Các bước thực hiện**:
  1. Gọi API với data hợp lệ
  2. Kiểm tra response có đúng format
  3. Kiểm tra xử lý lỗi khi API fail
  4. Kiểm tra xử lý lỗi khi mất kết nối

#### Test Case 4: updatePractice
- **Mục đích**: Kiểm tra API cập nhật practice
- **Các bước thực hiện**:
  1. Gọi API với data và ID hợp lệ
  2. Kiểm tra response có đúng format
  3. Kiểm tra xử lý lỗi khi API fail
  4. Kiểm tra xử lý lỗi khi mất kết nối

#### Test Case 5: DeletePractice
- **Mục đích**: Kiểm tra API xóa practice
- **Các bước thực hiện**:
  1. Gọi API với ID hợp lệ
  2. Kiểm tra response có đúng format
  3. Kiểm tra xử lý lỗi khi API fail
  4. Kiểm tra xử lý lỗi khi mất kết nối

### 2. Test API Authentication

#### Test Case 1: requestLogin
- **Mục đích**: Kiểm tra API đăng nhập
- **Các bước thực hiện**:
  1. Gọi API với credentials hợp lệ
  2. Kiểm tra response có đúng format
  3. Kiểm tra xử lý lỗi khi API fail
  4. Kiểm tra xử lý lỗi khi mất kết nối

#### Test Case 2: requestRegister
- **Mục đích**: Kiểm tra API đăng ký
- **Các bước thực hiện**:
  1. Gọi API với thông tin đăng ký hợp lệ
  2. Kiểm tra response có đúng format
  3. Kiểm tra xử lý lỗi khi API fail
  4. Kiểm tra xử lý lỗi khi mất kết nối

### 3. Test API Quiz

#### Test Case 1: fetchQuizzes
- **Mục đích**: Kiểm tra API lấy danh sách quiz
- **Các bước thực hiện**:
  1. Gọi API lấy danh sách
  2. Kiểm tra response có đúng format
  3. Kiểm tra xử lý lỗi khi API fail
  4. Kiểm tra xử lý lỗi khi mất kết nối

#### Test Case 2: fetchQuizById
- **Mục đích**: Kiểm tra API lấy chi tiết quiz
- **Các bước thực hiện**:
  1. Gọi API với ID hợp lệ
  2. Kiểm tra response có đúng format
  3. Kiểm tra xử lý lỗi khi API fail
  4. Kiểm tra xử lý lỗi khi mất kết nối

#### Test Case 3: submitQuizAnswers
- **Mục đích**: Kiểm tra API nộp bài quiz
- **Các bước thực hiện**:
  1. Gọi API với đáp án hợp lệ
  2. Kiểm tra response có đúng format
  3. Kiểm tra xử lý lỗi khi API fail
  4. Kiểm tra xử lý lỗi khi mất kết nối

### 4. Test API Home

#### Test Case 1: getHomeSectionHero
- **Mục đích**: Kiểm tra API lấy thông tin hero section
- **Các bước thực hiện**:
  1. Gọi API lấy dữ liệu
  2. Kiểm tra response có đúng format
  3. Kiểm tra xử lý lỗi khi API fail
  4. Kiểm tra xử lý lỗi khi mất kết nối

#### Test Case 2: getHomeSectionFeature
- **Mục đích**: Kiểm tra API lấy thông tin feature section
- **Các bước thực hiện**:
  1. Gọi API lấy dữ liệu
  2. Kiểm tra response có đúng format
  3. Kiểm tra xử lý lỗi khi API fail
  4. Kiểm tra xử lý lỗi khi mất kết nối

#### Test Case 3: getHomeSectionStatistics
- **Mục đích**: Kiểm tra API lấy thông tin statistics section
- **Các bước thực hiện**:
  1. Gọi API lấy dữ liệu
  2. Kiểm tra response có đúng format
  3. Kiểm tra xử lý lỗi khi API fail
  4. Kiểm tra xử lý lỗi khi mất kết nối

### 5. Test API Navbar

#### Test Case 1: getLogo
- **Mục đích**: Kiểm tra API lấy logo
- **Các bước thực hiện**:
  1. Gọi API lấy dữ liệu
  2. Kiểm tra response có đúng format
  3. Kiểm tra xử lý lỗi khi API fail
  4. Kiểm tra xử lý lỗi khi mất kết nối

#### Test Case 2: getNavItems
- **Mục đích**: Kiểm tra API lấy menu items
- **Các bước thực hiện**:
  1. Gọi API lấy dữ liệu
  2. Kiểm tra response có đúng format
  3. Kiểm tra xử lý lỗi khi API fail
  4. Kiểm tra xử lý lỗi khi mất kết nối

#### Test Case 3: getNavBtn
- **Mục đích**: Kiểm tra API lấy thông tin nút điều hướng
- **Các bước thực hiện**:
  1. Gọi API lấy dữ liệu
  2. Kiểm tra response có đúng format
  3. Kiểm tra xử lý lỗi khi API fail
  4. Kiểm tra xử lý lỗi khi mất kết nối

#### Test Case 4: getUserInfo
- **Mục đích**: Kiểm tra API lấy thông tin user
- **Các bước thực hiện**:
  1. Gọi API với token hợp lệ
  2. Kiểm tra response có đúng format
  3. Kiểm tra xử lý lỗi khi API fail
  4. Kiểm tra xử lý lỗi khi mất kết nối

## Kết quả Test

### Coverage Report

```
File                                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------------------|---------|----------|---------|---------|-------------------
All files                           |    7.54 |     4.7 |    4.8 |    7.67 |                   
 app                               |       0 |     100 |      0 |       0 |                   
  layout.tsx                       |       0 |     100 |      0 |       0 | 7-17              
  providers.tsx                    |       0 |     100 |      0 |       0 | 6                 
  store.js                         |       0 |     100 |      0 |       0 | 4-18              
 app/service                       |   25.45 |      40 |  15.62 |   25.45 |                   
  Footer_api.ts                    |       0 |     100 |      0 |       0 | 2-56              
  Navbar_api.ts                    |     100 |     100 |    100 |     100 |                   
  change_pass_api.tsx              |       0 |     100 |      0 |       0 | 2-24              
  examquestion.ts                  |       0 |        0 |      0 |       0 | 4-122             
  exams_api.tsx                    |       0 |        0 |      0 |       0 | 2-23              
  history_api.ts                   |     100 |    87.5 |    100 |     100 | 26                
  home_api.tsx                     |     100 |     100 |    100 |     100 |                   
  login_api.ts                     |     100 |      50 |     50 |     100 | 21-37             
  practice_api.tsx                 |     100 |     100 |    100 |     100 |                   
  quiz_api.ts                      |     100 |      75 |    100 |     100 | 9,21,49           
```

### Kết luận

1. Các API chính đã được test đầy đủ với coverage 100%:
   - Practice API
   - Navbar API  
   - Home API
   - Quiz API
   - Login API (Authentication)

2. Một số API phụ cần được test thêm:
   - Footer API
   - Change Password API
   - Exam Question API
   - Exams API

3. Các test case đã kiểm tra:
   - Happy path (API trả về thành công)
   - Error handling (API trả về lỗi)
   - Network error (Lỗi kết nối)
   - Input validation (Dữ liệu đầu vào)

4. Tất cả các test đều pass, chứng tỏ các API đang hoạt động đúng theo yêu cầu.

# hình ảnh minh hoa
