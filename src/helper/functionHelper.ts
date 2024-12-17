export function toSlug(str: string) {
    return str
        .normalize('NFD') // Bước 1: Tách ký tự có dấu
        .replace(/[\u0300-\u036f]/g, '') // Bước 2: Loại bỏ các dấu
        .toLowerCase() // Bước 3: Chuyển thành chữ thường
        .replace(/[^a-z0-9\s-]/g, '') // Bước 4: Loại bỏ ký tự đặc biệt (giữ chữ cái, số, khoảng trắng và dấu '-')
        .replace(/\s+/g, '-') // Bước 5: Thay khoảng trắng bằng dấu '-'
        .replace(/-+/g, '-') // Bước 6: Loại bỏ dấu '-' trùng lặp
        .replace(/^-+|-+$/g, ''); // Bước 7: Loại bỏ dấu '-' ở đầu và cuối chuỗi
}