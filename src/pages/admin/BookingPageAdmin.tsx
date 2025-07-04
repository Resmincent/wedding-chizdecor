import { useEffect, useState } from "react";
import Header from "../../components/admin/Header";
import { tokens } from "../../theme";
import {
  Box,
  Button,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { getAllBookings, cancelBooking } from "../../services/bookingService";
import type { BookingDetailAdmin } from "../../models/model";
import { toast } from "react-toastify";

export default function BookingPageAdmin() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [bookings, setBookings] = useState<BookingDetailAdmin[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await getAllBookings();
      setBookings(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch bookings:", error);
      toast.error("Gagal memuat data booking.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId: string) => {
    try {
      await cancelBooking(bookingId);
      toast.success("Booking berhasil dibatalkan.");
      fetchBookings(); // refresh tabel
    } catch (error) {
      console.error("❌ Failed to cancel booking:", error);
      toast.error("Gagal membatalkan booking.");
    }
  };

  // Helper function untuk format currency
  const formatCurrency = (amount: number): string => {
    return `Rp ${amount.toLocaleString("id-ID")}`;
  };

  // Helper function untuk format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function untuk format status
  const formatStatus = (status: string): string => {
    const statusMap: { [key: string]: string } = {
      pending: "PENDING",
      cancelled: "CANCELLED",
      first_paid: "FIRST PAID",
      fully_paid: "FULLY PAID",
      confirmed: "CONFIRMED",
    };
    return statusMap[status] || status.toUpperCase();
  };

  if (loading) {
    return (
      <Box
        m="20px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Booking" subtitle="Manage your bookings here" />
      </Box>
      <Box mt="20px" p="20px">
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: colors.primary[400] }}>
              <TableRow>
                <TableCell sx={{ color: colors.grey[100], fontWeight: "bold" }}>
                  Booking ID
                </TableCell>
                <TableCell sx={{ color: colors.grey[100], fontWeight: "bold" }}>
                  Customer Name
                </TableCell>
                <TableCell sx={{ color: colors.grey[100], fontWeight: "bold" }}>
                  Phone Number
                </TableCell>
                <TableCell sx={{ color: colors.grey[100], fontWeight: "bold" }}>
                  Decoration Package
                </TableCell>
                <TableCell sx={{ color: colors.grey[100], fontWeight: "bold" }}>
                  Booking Date
                </TableCell>
                <TableCell sx={{ color: colors.grey[100], fontWeight: "bold" }}>
                  Status
                </TableCell>
                <TableCell sx={{ color: colors.grey[100], fontWeight: "bold" }}>
                  Base Price
                </TableCell>
                <TableCell sx={{ color: colors.grey[100], fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.user.name}</TableCell>
                  <TableCell>{booking.user.phone_number}</TableCell>
                  <TableCell>{booking.decoration.title}</TableCell>
                  <TableCell>{formatDate(booking.date)}</TableCell>
                  <TableCell>{formatStatus(booking.status)}</TableCell>
                  <TableCell>
                    {formatCurrency(booking.decoration.base_price)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleCancel(booking.id)}
                      disabled={booking.status === "cancelled"}
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {bookings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    Tidak ada data booking.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
