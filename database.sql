CREATE DATABASE IF NOT EXISTS cinema_system;
USE cinema_system;


CREATE TABLE HeThongRap (
  ma_he_thong_rap VARCHAR(255) PRIMARY KEY,
  ten_he_thong_rap VARCHAR(255),
  logo VARCHAR(255)
);

CREATE TABLE CumRap (
  ma_cum_rap INT AUTO_INCREMENT PRIMARY KEY,
  ten_cum_rap VARCHAR(255),
  dia_chi VARCHAR(255),
  ma_he_thong_rap VARCHAR(255),
  FOREIGN KEY (ma_he_thong_rap) REFERENCES HeThongRap(ma_he_thong_rap) ON DELETE CASCADE
);

CREATE TABLE RapPhim (
  ma_rap INT AUTO_INCREMENT PRIMARY KEY,
  ten_rap VARCHAR(255),
  ma_cum_rap INT,
  FOREIGN KEY (ma_cum_rap) REFERENCES CumRap(ma_cum_rap) ON DELETE CASCADE
);

CREATE TABLE Ghe (
  ma_ghe INT AUTO_INCREMENT PRIMARY KEY,
  ten_ghe VARCHAR(255),
  loai_ghe VARCHAR(255),
  ma_rap INT,
  FOREIGN KEY (ma_rap) REFERENCES RapPhim(ma_rap) ON DELETE CASCADE
);

CREATE TABLE Phim (
  ma_phim INT AUTO_INCREMENT PRIMARY KEY,
  ten_phim VARCHAR(255),
  trailer VARCHAR(255),
  hinh_anh VARCHAR(255),
  mo_ta VARCHAR(255),
  ngay_khoi_chieu DATE,
  danh_gia INT,
  hot BOOLEAN,
  dang_chieu BOOLEAN,
  sap_chieu BOOLEAN
);

CREATE TABLE Banner (
  ma_banner INT AUTO_INCREMENT PRIMARY KEY,
  ma_phim INT,
  hinh_anh VARCHAR(255),
  FOREIGN KEY (ma_phim) REFERENCES Phim(ma_phim) ON DELETE CASCADE
);

CREATE TABLE LichChieu (
  ma_lich_chieu INT AUTO_INCREMENT,
  ma_rap INT,
  ma_phim INT,
  ngay_gio_chieu DATETIME,
  gia_ve INT,
  PRIMARY KEY (ma_lich_chieu, ma_rap, ma_phim),
  UNIQUE KEY (ma_lich_chieu),
  FOREIGN KEY (ma_rap) REFERENCES RapPhim(ma_rap) ON DELETE CASCADE,
  FOREIGN KEY (ma_phim) REFERENCES Phim(ma_phim) ON DELETE CASCADE
);

CREATE TABLE LoaiNguoiDung (
  loai_nguoi_dung VARCHAR(255) PRIMARY KEY,
  ten_loai VARCHAR(255)
);

INSERT INTO LoaiNguoiDung (loai_nguoi_dung, ten_loai) VALUES ('KhachHang', 'Khách hàng');
INSERT INTO LoaiNguoiDung (loai_nguoi_dung, ten_loai) VALUES ('QuanTri', 'Quản trị viên');

CREATE TABLE NguoiDung (
  tai_khoan VARCHAR(255) PRIMARY KEY,
  ho_ten VARCHAR(255),
  email VARCHAR(255),
  so_dt VARCHAR(255),
  mat_khau VARCHAR(255),
  loai_nguoi_dung VARCHAR(255),
  FOREIGN KEY (loai_nguoi_dung) REFERENCES LoaiNguoiDung(loai_nguoi_dung) ON DELETE CASCADE
);

CREATE TABLE DatVe (
  tai_khoan VARCHAR(255),
  ma_lich_chieu INT,
  ma_ghe INT,
  PRIMARY KEY (tai_khoan, ma_lich_chieu),
  FOREIGN KEY (tai_khoan) REFERENCES NguoiDung(tai_khoan) ON DELETE CASCADE,
  FOREIGN KEY (ma_lich_chieu) REFERENCES LichChieu(ma_lich_chieu) ON DELETE CASCADE
);

-- Tạo các chỉ mục (index)
CREATE INDEX idx_ma_he_thong_rap ON CumRap(ma_he_thong_rap);
CREATE INDEX idx_ma_cum_rap ON RapPhim(ma_cum_rap);
CREATE INDEX idx_ma_rap ON Ghe(ma_rap);
CREATE INDEX idx_ma_phim ON Banner(ma_phim);
CREATE INDEX idx_ma_rap ON LichChieu(ma_rap);
CREATE INDEX idx_ma_phim ON LichChieu(ma_phim);
CREATE INDEX idx_loai_nguoi_dung ON NguoiDung(loai_nguoi_dung);
CREATE INDEX idx_ma_lich_chieu ON DatVe(ma_lich_chieu);
