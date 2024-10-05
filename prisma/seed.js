const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
  // Seed LoaiNguoiDung
  const userTypes = [
    { loai_nguoi_dung: 'KhachHang', ten_loai: 'Khách hàng' },
    { loai_nguoi_dung: 'QuanTri', ten_loai: 'Quản trị viên' }
  ];

  for (let userType of userTypes) {
    await prisma.loaiNguoiDung.upsert({
      where: { loai_nguoi_dung: userType.loai_nguoi_dung },
      update: {},
      create: userType
    });
  }

  // Seed HeThongRap
  const heThongRaps = [
    { ma_he_thong_rap: 'CGV', ten_he_thong_rap: 'CGV', logo: 'cgv_logo.png' },
    { ma_he_thong_rap: 'LOTTE', ten_he_thong_rap: 'Lotte Cinema', logo: 'lotte_logo.png' },
    { ma_he_thong_rap: 'GALAXY', ten_he_thong_rap: 'Galaxy Cinema', logo: 'galaxy_logo.png' }
  ];

  for (let rap of heThongRaps) {
    await prisma.heThongRap.upsert({
      where: { ma_he_thong_rap: rap.ma_he_thong_rap },
      update: {},
      create: rap
    });
  }

  // Seed CumRap
  const cumRaps = [
    { ten_cum_rap: 'CGV Vincom Đà Nẵng', dia_chi: 'Tầng 4, TTTM Vincom Đà Nẵng, 910A Ngô Quyền, An Hải Bắc, Sơn Trà, Đà Nẵng', ma_he_thong_rap: 'CGV' },
    { ten_cum_rap: 'Lotte Cinema Đà Nẵng', dia_chi: 'Tầng 5, Lotte Mart Đà Nẵng, 6 Nại Nam, Hòa Cường Bắc, Hải Châu, Đà Nẵng', ma_he_thong_rap: 'LOTTE' },
    { ten_cum_rap: 'Galaxy Đà Nẵng', dia_chi: 'Tầng 3, TTTM Đà Nẵng, 60 Lê Duẩn, Hải Châu 1, Hải Châu, Đà Nẵng', ma_he_thong_rap: 'GALAXY' }
  ];

  for (let cumRap of cumRaps) {
    await prisma.cumRap.create({
      data: cumRap
    });
  }

  // Seed một số Phim
  const phims = [
    {
      ten_phim: 'Avengers: Endgame',
      trailer: 'https://www.youtube.com/watch?v=TcMBFSGVi1c',
      hinh_anh: 'avengers_endgame.jpg',
      mo_ta: 'Biệt đội siêu anh hùng Avengers và các đồng minh sẽ phải sẵn sàng hi sinh tất cả để có thể đánh bại kẻ thù hùng mạnh Thanos trước khi hắn phá hủy mọi thứ và chấm dứt vũ trụ.',
      ngay_khoi_chieu: new Date('2023-04-26'),
      danh_gia: 8,
      hot: true,
      dang_chieu: true,
      sap_chieu: false
    },
    {
      ten_phim: 'Spider-Man: No Way Home',
      trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
      hinh_anh: 'spiderman_no_way_home.jpg',
      mo_ta: 'Với danh tính của Spider-Man giờ đã được tiết lộ, Peter nhờ Doctor Strange giúp đỡ. Khi một câu thần chú bị sai, những kẻ thù nguy hiểm từ các thế giới khác bắt đầu xuất hiện, buộc Peter phải khám phá ra ý nghĩa thực sự của việc trở thành Spider-Man.',
      ngay_khoi_chieu: new Date('2023-12-17'),
      danh_gia: 9,
      hot: true,
      dang_chieu: true,
      sap_chieu: false
    },
    {
      ten_phim: 'The Matrix',
      trailer: 'https://www.youtube.com/watch?v=vKQi3bBA1y8',
      hinh_anh: 'the_matrix.jpg',
      mo_ta: 'Nhận ra sự thật để thoát khỏi The Matrix.',
      ngay_khoi_chieu: new Date('2024-12-03'),
      danh_gia: 10,
      hot: true,
      dang_chieu: true,
      sap_chieu: false
    }
  ];

  for (let phim of phims) {
    await prisma.phim.create({
      data: phim
    });
  }

  // Seed một NguoiDung quản trị
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.nguoiDung.create({
    data: {
      tai_khoan: 'admin',
      ho_ten: 'Admin User',
      email: 'admin@example.com',
      so_dt: '0123456789',
      mat_khau: adminPassword,
      loai_nguoi_dung: 'QuanTri'
    }
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });