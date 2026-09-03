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
				'🐥 ¡Hola, PIKIITOS! 💛 Creo que encontré la próxima aventura de mi peque 🌊☀️ ¿Me ayudan a elegir?\nNecesito asesoría 🐣💛'
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
		intro: 'Queremos que tu experiencia con PIKIITOS sea fácil, clara y segura. Al realizar una compra en nuestra tienda aceptas las siguientes condiciones:',
		sections: [
			{
				title: '1. Productos y tallas',
				paragraphs: [
					'Antes de comprar, revisa la descripción del producto y nuestra guía de tallas.',
					'Los colores pueden presentar pequeñas variaciones según la pantalla o iluminación de las fotografías.'
				]
			},
			{
				title: '2. Pagos',
				paragraphs: [
					'Todos los precios están expresados en pesos colombianos (COP).',
					'Tu pedido quedará confirmado una vez el pago sea aprobado por el medio de pago seleccionado.'
				]
			},
			{
				title: '3. Envíos',
				paragraphs: [
					'Realizamos envíos a los destinos habilitados en nuestra tienda.',
					'El costo y tiempo estimado de entrega serán informados durante el proceso de compra.',
					'Los tiempos pueden variar por novedades de la transportadora o situaciones externas.'
				]
			},
			{
				title: '4. Cambios',
				paragraphs: [
					'Puedes solicitar un cambio de talla o referencia dentro de los 15 días calendario siguientes a la entrega.',
					'La prenda debe estar sin usar, sin lavar, con sus etiquetas originales y en perfecto estado.',
					'Los cambios están sujetos a disponibilidad.',
					'Si el cambio es por talla, color o referencia, el costo del transporte será asumido por el cliente.',
					'Si PIKIITOS cometió un error en el pedido, nosotros asumiremos el costo correspondiente.'
				]
			},
			{
				title: '5. Derecho de retracto',
				paragraphs: [
					'En las compras realizadas por nuestra tienda virtual podrás ejercer el derecho de retracto dentro de los 5 días hábiles siguientes a la entrega, cuando legalmente corresponda y de acuerdo con las condiciones establecidas por la legislación colombiana.'
				]
			},
			{
				title: '6. Garantía',
				paragraphs: [
					'Si tu producto presenta un posible defecto de fabricación, confección o material, comunícate con nosotros con tu número de pedido, descripción de la novedad y fotografías.',
					'Revisaremos el caso conforme a la garantía legal aplicable.'
				]
			},
			{
				title: '7. Cuidado de las prendas',
				paragraphs: [
					'Sigue siempre las instrucciones de lavado de la etiqueta.',
					'Después de utilizar las prendas en playa o piscina, recomendamos retirar residuos de cloro, sal, arena y bloqueador para ayudar a conservarlas.'
				]
			}
		],
		outro: 'PIKIITOS 🐥\nPequeñas prendas para grandes aventuras.',
		contactTitle: '¿Necesitas ayuda?',
		contactSubtitle: 'Puedes comunicarte con PIKIITOS a través de nuestros canales oficiales. Estaremos felices de acompañarte antes, durante y después de tu compra.',
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
			defaultMessage: '🐥 ¡Hola, PIKIITOS! 💛 Creo que encontré la próxima aventura de mi peque 🌊☀️ ¿Me ayudan a elegir?\nNecesito asesoría 🐣💛'
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
		intro: 'We want your experience with PIKIITOS to be easy, clear, and secure. By making a purchase in our store, you accept the following conditions:',
		sections: [
			{
				title: '1. Products and sizes',
				paragraphs: [
					'Before purchasing, check the product description and our size guide.',
					'Colors may have slight variations depending on the screen or lighting in the photographs.'
				]
			},
			{
				title: '2. Payments',
				paragraphs: [
					'All prices are expressed in Colombian pesos (COP).',
					'Your order will be confirmed once the payment is approved by the selected payment method.'
				]
			},
			{
				title: '3. Shipping',
				paragraphs: [
					'We ship to destinations enabled in our store.',
					'The shipping cost and estimated delivery time will be provided during the checkout process.',
					'Times may vary due to carrier updates or external circumstances.'
				]
			},
			{
				title: '4. Exchanges',
				paragraphs: [
					'You may request a size or reference exchange within 15 calendar days following delivery.',
					'The garment must be unworn, unwashed, with its original tags and in perfect condition.',
					'Exchanges are subject to availability.',
					'If the exchange is for size, color, or reference, the shipping cost will be covered by the customer.',
					'If PIKIITOS made an error in the order, we will cover the corresponding cost.'
				]
			},
			{
				title: '5. Right of withdrawal',
				paragraphs: [
					'For purchases made through our online store, you may exercise the right of withdrawal within 5 business days following delivery, when legally applicable and in accordance with the conditions established by Colombian legislation.'
				]
			},
			{
				title: '6. Warranty',
				paragraphs: [
					'If your product presents a possible manufacturing, assembly, or material defect, contact us with your order number, description of the issue, and photographs.',
					'We will review the case in accordance with the applicable legal warranty.'
				]
			},
			{
				title: '7. Garment care',
				paragraphs: [
					'Always follow the washing instructions on the label.',
					'After using garments at the beach or pool, we recommend removing chlorine, salt, sand, and sunscreen residues to help preserve them.'
				]
			}
		],
		outro: 'PIKIITOS 🐥\nSmall garments for big adventures.',
		contactTitle: 'Need help?',
		contactSubtitle: 'You can contact PIKIITOS through our official channels. We will be happy to assist you before, during, and after your purchase.',
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
