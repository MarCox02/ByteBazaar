export class Producto {
    id_producto!: number; // Es opcional ya que es autoincremental en la base de datos
    nom_producto!: string; // Nombre del producto
    desc_producto!: string; // Descripción del producto
    precio!: number; // Precio del producto
    stock!: number; // Cantidad disponible
    id_tipo!: string; // El ID del tipo de producto (relacionado con la tabla tipoproducto)
    imagen!: string; // Añade este campo opcional para la imagen
    rut_v!: string; // RUT del vendedor
}