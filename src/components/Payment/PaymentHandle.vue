<template>
    <div>
        <p>This page handle payment result from VNPAY</p>
        <p v-if="amountString">Payment amount: {{ amountString }}</p>
        <p v-if="bankCode">Bank code: {{ bankCode }}</p>
        <p v-if="payDate">Pay date: {{ payDate }}</p>
        <p v-if="transationNo">Transactiono: {{ transationNo }}</p>
        <p v-if="responseCode">Payment responseCode: {{ responseCode }}</p>
        <p v-if="vnpCardType">Payment Method: {{ vnpCardType }}</p>
       
    </div>
    <p>{{ paymentDataValue }}</p>

</template>


<script setup>
import { onMounted, ref } from 'vue';
import { usePaymentStore } from '../../stores/PaymentStore';
import { useClubStore } from '../../stores/clubMng';
import { storeToRefs } from 'pinia'
import axios from 'axios';
import { computed } from 'vue';
axios.defaults.withCredentials = true;

const useClubStr = useClubStore();
const { currentClub } = storeToRefs(useClubStr)
const paymentStore = usePaymentStore()
const responseCode = ref('');
const amountString = ref(''); // 
const bankCode = ref(''); 
const payDate = ref(''); // 
const transationNo = ref('');   
const vnpCardType = ref(''); // 
const paymentDataValue = ref('');
onMounted(async () => {
    try {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentData = Object.fromEntries(urlParams.entries());

    paymentDataValue.value = paymentData;
    responseCode.value = paymentData.vnp_ResponseCode;
    amountString.value = paymentData.vnp_Amount;
    bankCode.value = paymentData.vnp_BankCode;
    payDate.value = paymentData.vnp_PayDate;
    transationNo.value = paymentData.vnp_TransactionNo;
    vnpCardType.value = paymentData.vnp_CardType;
    currentClub.value = currentClub.value ?? {}
    paymentStore.loadPaymentPayloadSessionStorage();
    console.log(paymentStore.paymentPayload)
    if(responseCode.value === "00"){
        console.log('Day la court manager phone', currentClub.value.courtManagerPhone)
        const paymentDetail = {
            amount: amountString.value,
            paymentTime: parseDateTimeString(payDate.value) ,
            paymentMethod: vnpCardType.value,
        };
        const payload = {
            bookingSchedule: paymentStore.paymentPayload.bookingSchedule,
            paymentDetail: paymentDetail,
            courtManagerPhone: paymentStore.paymentPayload.currentClubInfo.courtManagerPhone,
            clubId: paymentStore.paymentPayload.currentClubInfo.clubId,
            clubName: paymentStore.paymentPayload.currentClubInfo.clubName
        };
        
            const response = await axios.post(`http://localhost:8080/courtmaster/booking/payment-handle`,payload);
            console.log('Response from server:', response.data);
        } 
    }catch (error) {
            console.error('Error sending payment data:', error);
        }
});

function parseDateTimeString(dateTimeString) {
    // Extract components from the input string
    let year = dateTimeString.substr(0, 4);
    let month = dateTimeString.substr(4, 2);
    let day = dateTimeString.substr(6, 2);
    let hour = dateTimeString.substr(8, 2);
    let minute = dateTimeString.substr(10, 2);
    let second = dateTimeString.substr(12, 2);

    // Format the string for Java LocalDateTime.parse()
    let formattedDateTimeString = `${year}-${month}-${day}T${hour}:${minute}:${second}`;

    return formattedDateTimeString;
}

</script>
