import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "@/lib/axios";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const StudentScores = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [subjectCode, setSubjectCode] = useState("");
  const [scoreValue, setScoreValue] = useState("");
  const [midterm, setMidterm] = useState("");
  const [finalExam, setFinalExam] = useState("");
  const [term, setTerm] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetchData();
  }, [code]);

  const fetchData = async () => {
    try {
      const [sRes, subRes] = await Promise.all([
        api.get(`/students/${code}`),
        api.get(`/subjects`),
      ]);
      setStudent(sRes.data);
      setSubjects(subRes.data || []);
      if ((subRes.data || []).length > 0) {
        setSubjectCode(subRes.data[0].subject_code || subRes.data[0].code || "");
      }

      // fetch existing scores for this student
      const scoreRes = await api.get(`/scores/student/${code}`);
      setScores(scoreRes.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Không thể tải dữ liệu");
    }
  };

  const submitScore = async () => {
    if (!subjectCode) {
      toast.error("Chọn môn trước khi lưu điểm");
      return;
    }

    // compute total if possible
    const mid = midterm === "" ? null : Number(midterm);
    const fin = finalExam === "" ? null : Number(finalExam);
    const tot = scoreValue === "" ? (mid != null && fin != null ? (mid + fin) / 2 : null) : Number(scoreValue);

    try {
      await api.post(`/scores`, {
        student_code: code,
        subject_code: subjectCode,
        midterm: mid,
        final: fin,
        total: tot,
        term: term || "",
        year: year || new Date().getFullYear(),
      });
      toast.success("Điểm đã được lưu");
      // refresh scores list and clear inputs
      const scoreRes = await api.get(`/scores/student/${code}`);
      setScores(scoreRes.data || []);
      setScoreValue("");
      setMidterm("");
      setFinalExam("");
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi lưu điểm");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-12">
      <div className="w-full max-w-xl">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Nhập điểm cho sinh viên</h2>

          {student ? (
            <div className="mb-4">
              <div className="text-lg font-medium">{student.name}</div>
              <div className="text-sm text-muted-foreground">{student.student_code}</div>
            </div>
          ) : (
            <div className="mb-4">Đang tải sinh viên...</div>
          )}

          <div className="mb-3">
            <label className="block text-sm mb-1">Môn</label>
            <select
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              className="w-full h-10 rounded-md border px-3"
            >
              {subjects.map((sub) => (
                <option key={sub.subject_code ?? sub.code} value={sub.subject_code ?? sub.code}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div>
              <label className="block text-sm mb-1">Giữa kỳ</label>
              <Input value={midterm} onChange={(e) => setMidterm(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm mb-1">Cuối kỳ</label>
              <Input value={finalExam} onChange={(e) => setFinalExam(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm mb-1">Tổng</label>
              <Input value={scoreValue} onChange={(e) => setScoreValue(e.target.value)} placeholder="(tự tính nếu để trống)" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-sm mb-1">Học kỳ</label>
              <Input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="ví dụ: HK1" />
            </div>
            <div>
              <label className="block text-sm mb-1">Năm</label>
              <Input value={year} onChange={(e) => setYear(e.target.value)} />
            </div>
          </div>

          {scores.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium mb-2">Các môn đã có điểm</h3>
              <ul className="space-y-2">
                {scores.map((sc) => (
                  <li key={sc.id} className="border rounded-md p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-medium">{sc.subject?.name ?? sc.subject_code}</div>
                        <div className="text-xs text-muted-foreground">{sc.term ?? ""} {sc.year ? `- ${sc.year}` : ""}</div>
                        <div className="text-xs text-muted-foreground">{sc.createdAt ? new Date(sc.createdAt).toLocaleString() : ""}</div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm">Giữa kỳ: <span className="font-semibold">{sc.midterm ?? "-"}</span></div>
                        <div className="text-sm">Cuối kỳ: <span className="font-semibold">{sc.final ?? "-"}</span></div>
                        <div className="text-lg font-bold mt-1">Tổng: {sc.total ?? "-"}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="primary" onClick={submitScore}>
              Lưu điểm
            </Button>
            <Button variant="ghost" onClick={() => navigate(-1)}>
              Quay lại
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentScores;
