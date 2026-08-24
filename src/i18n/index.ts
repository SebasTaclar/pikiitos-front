import { createI18n } from 'vue-i18n'

export type SupportedLocale = 'es' | 'en'

const STORAGE_KEY = 'pikiitos_locale'

const messages = {
	es: {
		brand: {
			tagline: 'Ropa infantil con amor'
		},
		nav: {
			newArrivals: 'Novedades',
			collections: 'Colecciones',
			categories: 'Categorías',
			offers: 'Ofertas'
		},
		auth: {
			access: 'Acceder',
			adminPanel: '⚙️ Panel Admin',
			logout: 'Cerrar sesión',
			hello: 'Hola, {name}'
		},
		banner: {
			tagline: 'Donde cada prenda cuenta una historia de amor',
			explore: 'EXPLORAR COLECCIÓN',
			learnMore: 'CONOCER MÁS',
			scrollDown: 'Desliza',
			logoAlt: 'Pikiitos'
		},
		visit: {
			title: 'Visítanos',
			subtitle: 'Pikiitos: ven por la mejor ropa para tus peques.',
			addressLabel: 'Dirección',
			phoneLabel: 'Teléfono',
			emailLabel: 'Correo',
			hoursLabel: 'Horarios'
		},
		footer: {
			description: 'Ropa infantil diseñada con amor para que cada momento sea un recuerdo inolvidable.',
			followUs: 'Síguenos',
			quickLinks: 'Enlaces Rápidos',
			customerSupport: 'Atención al Cliente',
			madeWith: 'Pequeños momentos, grandes recuerdos ✨',
			copyright: '© {year} Pikiitos. Todos los derechos reservados.',
			links: {
				products: 'Productos',
				categories: 'Categorías',
				testimonials: 'Testimonios',
				contact: 'Contacto',
				shippingPolicy: 'Política de Envíos',
				returns: 'Cambios y Devoluciones',
				faq: 'Preguntas Frecuentes',
				terms: 'Términos y Condiciones'
			}
		},
		whatsapp: {
			defaultMessage:
				'Hola! Me interesa conocer más sobre los productos y soluciones de Pikiitos. ¿Me pueden brindar más información?'
		},
		store: {
			pickup: {
				title: 'Edificio Víctor Melo · Local 07',
				addressLine: 'Cl. 12 #6-10 · La Candelaria, Bogotá',
				hoursTitle: 'Horarios de atención',
				hours: {
					weekday: 'Lunes a Viernes: 9:00 AM - 6:00 PM',
					saturday: 'Sábados: 9:00 AM - 2:00 PM',
					sunday: 'Domingos y festivos: Cerrado'
				}
			}
		},
		social: {
			instagramFollow: 'Síguenos en Instagram para ver más novedades',
			instagramLabel: 'Instagram'
		},
		quotation: {
			title: 'Mi Cotización',
			empty: 'No hay productos en tu cotización',
			continueExploring: 'Continuar explorando',
			sendQuote: 'Solicitar cotización',
			addToQuote: 'Agregar a cotización',
			productsSelected: '{count} productos seleccionados',
			observations: 'Observaciones',
			observationsPlaceholder: 'Ej: Talla 10, Color amarillo, Curva C',
			remove: 'Eliminar',
			clearAll: 'Limpiar cotización',
			yourQuote: 'Tu Cotización'
		},
		terms: {
			back: 'Volver',
			title: 'Términos y Condiciones',
			updated: 'Última actualización',
			accept: 'He leído y acepto'
		},
		termsPage: {
			sections: [
				{
					title: '1. Información general',
					paragraphs: [
						'Estos Términos y Condiciones regulan el uso del sitio web de Pikiitos y la compra de productos ofrecidos a través de este.',
						'Pikiitos es una marca de ropa infantil ubicada en Bogotá, Colombia. Al navegar, registrarte o realizar una compra en nuestro sitio, aceptas íntegramente estos términos.',
						'Nos reservamos el derecho de actualizar estos términos cuando sea necesario. La versión vigente será la publicada en esta página.'
					]
				},
				{
					title: '2. Productos',
					paragraphs: [
						'Las prendas infantiles publicadas pueden variar ligeramente en color, tonalidad o textura debido a iluminación, pantallas o procesos artesanales de fabricación.',
						'La disponibilidad de productos puede cambiar sin previo aviso. Si un producto no se encuentra disponible, te contactaremos para ofrecerte alternativas o gestionar la devolución del pago.'
					],
					bullets: [
						'Las fotografías son de referencia y buscan representar el producto de la forma más fiel posible.',
						'Las medidas, telas y descripciones pueden tener variaciones mínimas tolerables en prendas artesanales.'
					]
				},
				{
					title: '3. Precios y pagos',
					paragraphs: [
						'Los precios se muestran en pesos colombianos (COP) e incluyen los impuestos de ley cuando corresponda.',
						'El pago se procesa a través de la pasarela de pago Wompi. La confirmación del pedido depende de la validación exitosa del pago.',
						'El costo de envío se calcula según la ciudad de destino y se confirma antes de finalizar la compra.'
					],
					bullets: [
						'Los pedidos confirmados respetan el precio mostrado al momento del pago.',
						'Nos reservamos el derecho de rechazar o anular pedidos por sospecha de fraude, información inconsistente o errores en precios.'
					]
				},
				{
					title: '4. Envíos',
					paragraphs: [
						'Realizamos envíos a todo el territorio colombiano a través de transportadoras aliadas.',
						'El tiempo de entrega es estimado y puede variar según ciudad, transportadora, condiciones climáticas o eventos de fuerza mayor.',
						'Una vez despachado tu pedido, recibirás un número de guía para que puedas rastrear tu envío.'
					],
					bullets: [
						'Revisa cuidadosamente tus datos de contacto y dirección al momento de la compra para evitar retrasos.',
						'En caso de devolución por dirección incorrecta o ausencia en la entrega, los costos de reenvío correrán por cuenta del cliente.'
					]
				},
				{
					title: '5. Cambios y devoluciones',
					paragraphs: [
						'Si necesitas realizar un cambio o devolución, contáctanos a través de nuestros canales oficiales (Instagram o WhatsApp) indicando tu número de pedido.',
						'Tienes hasta 5 días hábiles después de recibido el producto para solicitar un cambio o devolución.',
						'Por razones de higiene, algunos productos como ropa interior o accesorios íntimos no aplican para cambio o devolución, salvo defecto de fabricación.',
						'Los productos deben llegar en las mismas condiciones en que fueron entregados: sin uso, con etiquetas originales y en su empaque.'
					],
					bullets: [
						'Los costos de envío para devoluciones corren por cuenta del cliente, salvo que el producto presente defecto de fabricación.',
						'Solo se aceptan cambios por talla o defecto, no por cambio de opinión.'
					]
				},
				{
					title: '6. Garantía',
					paragraphs: [
						'Pikiitos ofrece garantía contra defectos de fabricación por un término de 30 días calendario a partir de la fecha de entrega.',
						'La garantía no cubre daños derivados de mal uso, lavados inadecuados, golpes, caídas, contacto con químicos o desgaste normal del producto.'
					],
					bullets: [
						'Para reclamar la garantía, envía una foto del defecto junto con tu número de pedido por nuestros canales oficiales.',
						'Si el producto no está disponible para reemplazo, se emitirá un bono por el valor pagado.'
					]
				},
				{
					title: '7. Datos personales',
					paragraphs: [
						'En Pikiitos valoramos tu privacidad. Los datos personales que nos proporciones (nombre, correo, dirección y teléfono) serán utilizados únicamente para procesar tus pedidos, coordinar entregas y brindarte atención al cliente.',
						'No compartimos información personal con terceros, salvo cuando sea estrictamente necesario para el procesamiento del pago (Wompi) o la entrega del pedido (transportadora).',
						'Puedes solicitar la actualización o eliminación de tus datos en cualquier momento a través de nuestros canales oficiales.'
					]
				},
				{
					title: '8. Responsabilidad',
					paragraphs: [
						'Pikiitos no se hace responsable por demoras causadas por la transportadora, errores en la información proporcionada por el cliente o eventos fuera de nuestro control.',
						'El valor máximo de responsabilidad por cualquier compra no excederá el monto efectivamente pagado por el producto.'
					]
				},
				{
					title: '9. Ley aplicable',
					paragraphs: [
						'Estos términos se rigen por las leyes de la República de Colombia.',
						'Para cualquier controversia, las partes se someten a las autoridades judiciales de Bogotá, Colombia.'
					]
				}
			],
			contactTitle: '¿Tienes preguntas?',
			contactSubtitle: 'Si tienes dudas sobre tu compra, cambios, garantía o cualquier otro tema, escríbenos por cualquiera de nuestros canales oficiales.',
			pickupTitle: 'Recoger en tienda'
		},
		checkout: {
			back: 'Volver',
			title: 'Checkout',
			summaryTitle: 'Resumen del pedido',
			emptyCart: 'Tu carrito está vacío',
			goStore: 'Ir a la tienda',
			subtotal: 'Subtotal',
			shipping: 'Envío',
			shippingByDestination: 'Según destino',
			shippingNote: 'El costo de envío se calculará según tu ciudad de destino.',
			total: 'Total',
			totalAtDelivery: 'Total + envío al confirmar',
			continueShopping: 'Seguir comprando',
			contactTitle: 'Datos de contacto',
			fullName: 'Nombre completo',
			fullNamePlaceholder: 'Ej: María García',
			email: 'Correo electrónico',
			emailPlaceholder: 'maria@ejemplo.com',
			idNumber: 'Número de documento',
			idNumberPlaceholder: 'Ej: 1234567890',
			phone: 'Teléfono',
			phonePlaceholder: 'Ej: 300 123 4567',
			termsAcceptPrefix: 'Acepto los',
			termsAcceptLink: 'Términos y Condiciones',
			deliveryTitle: 'Dirección de envío',
			address: 'Dirección',
			addressPlaceholder: 'Ej: Calle 45 #12-34, Apto 501',
			city: 'Ciudad',
			cityPlaceholder: 'Ej: Bogotá',
			deliveryPhone: 'Teléfono de contacto',
			confirm: 'Confirmar pedido',
			processing: 'Procesando...',
			errors: {
				nameRequired: 'El nombre es obligatorio',
				emailRequired: 'El correo es obligatorio',
				emailInvalid: 'El correo no es válido',
				idRequired: 'El número de documento es obligatorio',
				phoneRequired: 'El teléfono es obligatorio',
				addressRequired: 'La dirección es obligatoria',
				cityRequired: 'La ciudad es obligatoria',
				deliveryPhoneRequired: 'El teléfono de contacto es obligatorio',
				termsRequired: 'Debes aceptar los términos y condiciones'
			}
		},
		videos: {
			title: 'Videos',
			subtitle: 'Mira algunos de nuestros favoritos',
			viewOnTikTok: 'Ver en TikTok',
			clickToLoad: 'Click para cargar videos'
		}
	},
	en: {
		brand: {
			tagline: 'Children\'s clothing with love'
		},
		nav: {
			newArrivals: 'New Arrivals',
			collections: 'Collections',
			categories: 'Categories',
			offers: 'Deals'
		},
		auth: {
			access: 'Sign in',
			adminPanel: '⚙️ Admin Panel',
			logout: 'Sign out',
			hello: 'Hi, {name}'
		},
		banner: {
			tagline: 'Where every piece tells a story of love',
			explore: 'EXPLORE COLLECTION',
			learnMore: 'LEARN MORE',
			scrollDown: 'Scroll',
			logoAlt: 'Pikiitos'
		},
		visit: {
			title: 'Visit us',
			subtitle: 'Pikiitos: find the best clothing for your little ones.',
			addressLabel: 'Address',
			phoneLabel: 'Phone',
			emailLabel: 'Email',
			hoursLabel: 'Hours'
		},
		footer: {
			description: 'Children\'s clothing designed with love so every moment becomes an unforgettable memory.',
			followUs: 'Follow us',
			quickLinks: 'Quick Links',
			customerSupport: 'Customer Support',
			madeWith: 'Small moments, big memories ✨',
			copyright: '© {year} Pikiitos. All rights reserved.',
			links: {
				products: 'Products',
				categories: 'Categories',
				testimonials: 'Testimonials',
				contact: 'Contact',
				shippingPolicy: 'Shipping Policy',
				returns: 'Exchanges & Returns',
				faq: 'FAQ',
				terms: 'Terms & Conditions'
			}
		},
		whatsapp: {
			defaultMessage: 'Hi! I would like to know more about Pikiitos products and solutions. Can you share more information?'
		},
		store: {
			pickup: {
				title: 'Víctor Melo Building · Store 07',
				addressLine: 'Calle 12 #6-10 · La Candelaria, Bogotá',
				hoursTitle: 'Store hours',
				hours: {
					weekday: 'Mon - Fri: 9:00 AM - 6:00 PM',
					saturday: 'Saturdays: 9:00 AM - 2:00 PM',
					sunday: 'Sundays & holidays: Closed'
				}
			}
		},
		social: {
			instagramFollow: 'Follow us on Instagram for more news',
			instagramLabel: 'Instagram'
		},
		quotation: {
			title: 'My Quote',
			empty: 'No products in your quote',
			continueExploring: 'Continue browsing',
			sendQuote: 'Request quote',
			addToQuote: 'Add to quote',
			productsSelected: '{count} products selected',
			observations: 'Notes',
			observationsPlaceholder: 'E.g: Size 10, Yellow color, Curve C',
			remove: 'Remove',
			clearAll: 'Clear quote',
			yourQuote: 'Your Quote'
		},
		terms: {
			back: 'Back',
			title: 'Terms & Conditions',
			updated: 'Last updated',
			accept: 'I have read and accept'
		},
		termsPage: {
			sections: [
				{
					title: '1. General information',
					paragraphs: [
						'These Terms & Conditions govern the use of the Pikiitos website and the purchase of products offered through it.',
						'Pikiitos is a children\'s clothing brand based in Bogotá, Colombia. By browsing, signing up, or placing an order on our site, you fully accept these terms.',
						'We reserve the right to update these terms when necessary. The current version will be the one published on this page.'
					]
				},
				{
					title: '2. Products',
					paragraphs: [
						'Children\'s garments may vary slightly in color, tone, or texture due to lighting, screen displays, or artisanal manufacturing processes.',
						'Product availability may change without notice. If an item is out of stock, we will contact you to offer alternatives or process a refund.'
					],
					bullets: [
						'Photographs are for reference and aim to represent the product as accurately as possible.',
						'Measurements, fabrics, and descriptions may have minor tolerable variations in artisanal garments.'
					]
				},
				{
					title: '3. Pricing and payments',
					paragraphs: [
						'Prices are displayed in Colombian pesos (COP) and include applicable taxes when relevant.',
						'Payment is processed through the Wompi payment gateway. Order confirmation depends on successful payment validation.',
						'Shipping cost is calculated based on the destination city and is confirmed before completing your purchase.'
					],
					bullets: [
						'Confirmed orders keep the price displayed at the time of payment.',
						'We reserve the right to reject or cancel orders due to suspected fraud, inconsistent information, or pricing errors.'
					]
				},
				{
					title: '4. Shipping',
					paragraphs: [
						'We ship to all of Colombia through partner carriers.',
						'Delivery times are estimates and may vary by city, carrier, weather conditions, or force majeure events.',
						'Once your order is shipped, you will receive a tracking number to follow your delivery.'
					],
					bullets: [
						'Please double-check your contact details and address when placing your order to avoid delays.',
						'If a shipment is returned due to incorrect address or absence at delivery, redelivery costs will be covered by the customer.'
					]
				},
				{
					title: '5. Exchanges and returns',
					paragraphs: [
						'If you need to make an exchange or return, contact us through our official channels (Instagram or WhatsApp) with your order number.',
						'You have up to 5 business days after receiving the product to request an exchange or return.',
						'For hygiene reasons, some products such as underwear or intimate accessories are not eligible for exchange or return, except in case of manufacturing defects.',
						'Products must arrive in the same condition as delivered: unused, with original tags and in their packaging.'
					],
					bullets: [
						'Return shipping costs are covered by the customer, unless the product has a manufacturing defect.',
						'Only exchanges by size or defects are accepted; changes of mind are not eligible.'
					]
				},
				{
					title: '6. Warranty',
					paragraphs: [
						'Pikiitos offers a 30-day calendar warranty against manufacturing defects from the date of delivery.',
						'The warranty does not cover damage from misuse, improper washing, impacts, drops, chemical exposure, or normal wear and tear.'
					],
					bullets: [
						'To claim the warranty, send a photo of the defect along with your order number through our official channels.',
						'If the product is not available for replacement, a voucher for the paid amount will be issued.'
					]
				},
				{
					title: '7. Personal data',
					paragraphs: [
						'At Pikiitos we value your privacy. The personal data you provide (name, email, address, and phone) will only be used to process your orders, coordinate deliveries, and provide customer support.',
						'We do not share personal information with third parties except when strictly necessary for payment processing (Wompi) or order delivery (carrier).',
						'You may request the update or deletion of your data at any time through our official channels.'
					]
				},
				{
					title: '8. Liability',
					paragraphs: [
						'Pikiitos is not responsible for delays caused by the carrier, errors in information provided by the customer, or events beyond our control.',
						'The maximum liability for any purchase will not exceed the amount actually paid for the product.'
					]
				},
				{
					title: '9. Applicable law',
					paragraphs: [
						'These terms are governed by the laws of the Republic of Colombia.',
						'For any dispute, the parties submit to the judicial authorities of Bogotá, Colombia.'
					]
				}
			],
			contactTitle: 'Have questions?',
			contactSubtitle: 'If you have any questions about your purchase, exchanges, warranty, or anything else, reach out through any of our official channels.',
			pickupTitle: 'Store pickup'
		},
		checkout: {
			back: 'Back',
			title: 'Checkout',
			summaryTitle: 'Order summary',
			emptyCart: 'Your cart is empty',
			goStore: 'Go to store',
			subtotal: 'Subtotal',
			shipping: 'Shipping',
			shippingByDestination: 'Based on destination',
			shippingNote: 'Shipping cost will be calculated based on your destination city.',
			total: 'Total',
			totalAtDelivery: 'Total + shipping at confirmation',
			continueShopping: 'Continue shopping',
			contactTitle: 'Contact details',
			fullName: 'Full name',
			fullNamePlaceholder: 'E.g: María García',
			email: 'Email',
			emailPlaceholder: 'maria@example.com',
			idNumber: 'ID number',
			idNumberPlaceholder: 'E.g: 1234567890',
			phone: 'Phone',
			phonePlaceholder: 'E.g: 300 123 4567',
			termsAcceptPrefix: 'I accept the',
			termsAcceptLink: 'Terms & Conditions',
			deliveryTitle: 'Shipping address',
			address: 'Address',
			addressPlaceholder: 'E.g: 45th St #12-34, Apt 501',
			city: 'City',
			cityPlaceholder: 'E.g: Bogotá',
			deliveryPhone: 'Contact phone',
			confirm: 'Confirm order',
			processing: 'Processing...',
			errors: {
				nameRequired: 'Name is required',
				emailRequired: 'Email is required',
				emailInvalid: 'Invalid email',
				idRequired: 'ID number is required',
				phoneRequired: 'Phone is required',
				addressRequired: 'Address is required',
				cityRequired: 'City is required',
				deliveryPhoneRequired: 'Contact phone is required',
				termsRequired: 'You must accept the terms and conditions'
			}
		},
		videos: {
			title: 'Videos',
			subtitle: 'Watch some of our favorites',
			viewOnTikTok: 'View on TikTok',
			clickToLoad: 'Click to load videos'
		}
	}
} as const

function normalizeLocale(input: string | null | undefined): SupportedLocale {
	if (!input) return 'es'
	const value = input.toLowerCase()
	if (value.startsWith('en')) return 'en'
	return 'es'
}

export function getInitialLocale(): SupportedLocale {
	const storedRaw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
	if (storedRaw) return normalizeLocale(storedRaw)
	const browserRaw = typeof navigator !== 'undefined' ? navigator.language : null
	return normalizeLocale(browserRaw)
}

export function persistLocale(locale: SupportedLocale) {
	localStorage.setItem(STORAGE_KEY, locale)
}

export const i18n = createI18n({
	legacy: false,
	globalInjection: true,
	locale: getInitialLocale(),
	fallbackLocale: 'es',
	messages
})
